import { createClient } from "@/lib/supabase/server";
import type { Post, Comment } from "@/types/blog";
import Link from "next/link";
import AdminActions from "@/components/blog/AdminActions";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ data: posts }, { data: pendingComments }] = await Promise.all([
    supabase
      .from("posts")
      .select("id, slug, title, status, published_at, created_at, tags")
      .order("created_at", { ascending: false }),
    supabase
      .from("comments")
      .select("*, author:profiles(username, avatar_url), post:posts(title, slug)")
      .eq("is_approved", false)
      .order("created_at", { ascending: false }),
  ]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, color: "var(--dark)" }}>
          Dashboard
        </h1>
        <Link href="/admin/posts/new" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", padding: "10px 20px" }}>
          + New Post
        </Link>
      </div>

      {/* Posts */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--dark)", marginBottom: "16px" }}>
          Posts ({posts?.length ?? 0})
        </h2>
        <div style={{ background: "var(--white)", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--gray-100)" }}>
          {!posts || posts.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--gray-400)" }}>No posts yet.</div>
          ) : (posts as Post[]).map((post) => (
            <div key={post.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 20px", borderBottom: "1px solid var(--gray-100)",
            }}>
              <div>
                <div style={{ fontWeight: 600, color: "var(--dark)", marginBottom: "4px" }}>{post.title}</div>
                <div style={{ display: "flex", gap: "12px", fontSize: "0.8rem", color: "var(--gray-400)" }}>
                  <span style={{
                    background: post.status === "published" ? "#dcfce7" : "#fef9c3",
                    color: post.status === "published" ? "#16a34a" : "#854d0e",
                    padding: "2px 8px", borderRadius: "10px", fontWeight: 600,
                  }}>{post.status}</span>
                  {post.published_at && <span>{new Date(post.published_at).toLocaleDateString()}</span>}
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                {post.status === "published" && (
                  <Link href={`/blog/${post.slug}`} style={{ fontSize: "0.875rem", color: "var(--accent-blue)" }}>View</Link>
                )}
                <Link href={`/admin/posts/${post.id}/edit`} style={{ fontSize: "0.875rem", color: "var(--gray-600)" }}>Edit</Link>
                <AdminActions postId={post.id} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pending comments */}
      <section>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--dark)", marginBottom: "16px" }}>
          Pending Comments ({pendingComments?.length ?? 0})
        </h2>
        <div style={{ background: "var(--white)", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--gray-100)" }}>
          {!pendingComments || pendingComments.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--gray-400)" }}>All caught up!</div>
          ) : (pendingComments as (Comment & { post: { title: string; slug: string } })[]).map((c) => (
            <div key={c.id} style={{ padding: "16px 20px", borderBottom: "1px solid var(--gray-100)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--gray-400)", marginBottom: "6px" }}>
                    <strong style={{ color: "var(--dark)" }}>{c.author?.username ?? "Anonymous"}</strong>
                    {" on "}
                    <Link href={`/blog/${c.post?.slug}`} style={{ color: "var(--accent-blue)" }}>{c.post?.title}</Link>
                  </div>
                  <p style={{ color: "var(--gray-600)", fontSize: "0.9rem" }}>{c.body}</p>
                </div>
                <AdminActions commentId={c.id} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
