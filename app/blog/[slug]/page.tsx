import { createClient } from "@/lib/supabase/server";
import type { Post, Comment } from "@/types/blog";
import LikeButton from "@/components/blog/LikeButton";
import CommentsSection from "@/components/blog/CommentsSection";
import ShareButtons from "@/components/blog/ShareButtons";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt, cover_url")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) return { title: "Post not found" };

  return {
    title: `${post.title} — Andrew Urom`,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.cover_url ? [post.cover_url] : [],
    },
  };
}

// generateStaticParams omitted — posts are served dynamically with ISR

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const [{ data: post }, { data: comments }, { count: likeCount }] = await Promise.all([
    supabase
      .from("posts")
      .select("*, author:profiles(username, avatar_url)")
      .eq("slug", slug)
      .eq("status", "published")
      .single(),
    supabase
      .from("comments")
      .select("*, author:profiles(username, avatar_url)")
      .eq("post_id", (await supabase.from("posts").select("id").eq("slug", slug).single()).data?.id)
      .eq("is_approved", true)
      .order("created_at", { ascending: true }),
    supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", (await supabase.from("posts").select("id").eq("slug", slug).single()).data?.id),
  ]);

  if (!post) notFound();

  const typedPost = post as Post;
  const typedComments = (comments || []) as Comment[];

  return (
    <>
      <nav className="nav scrolled" id="nav" style={{ position: "fixed" }}>
        <Link href="/" className="nav-logo">Andrew Urom</Link>
        <div className="nav-links">
          <Link href="/#about" className="nav-link">About</Link>
          <Link href="/#projects" className="nav-link">Projects</Link>
          <Link href="/blog" className="nav-link" style={{ color: "var(--dark)" }}>Blog</Link>
          <Link href="/#contact" className="nav-link">Contact</Link>
        </div>
        <a href="mailto:andrewurom@gmail.com" className="nav-cta magnetic">Hire Me</a>
      </nav>

      <main style={{ paddingTop: "calc(var(--nav-h) + 48px)", minHeight: "100vh" }}>
        <article style={{ maxWidth: "860px", margin: "0 auto", padding: "0 40px 80px" }}>
          {/* Header */}
          <header style={{ marginBottom: "40px" }}>
            {typedPost.tags.length > 0 && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                {typedPost.tags.map((tag) => (
                  <span key={tag} style={{
                    background: "var(--accent-light)", color: "var(--accent-blue)",
                    padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 500,
                  }}>{tag}</span>
                ))}
              </div>
            )}
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-1px", color: "var(--dark)", marginBottom: "16px" }}>
              {typedPost.title}
            </h1>
            {typedPost.subtitle && (
              <p style={{ fontSize: "1.2rem", color: "var(--gray-600)", lineHeight: 1.6, marginBottom: "24px" }}>{typedPost.subtitle}</p>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "var(--gray-400)", fontSize: "0.875rem" }}>
              {typedPost.published_at && (
                <time dateTime={typedPost.published_at}>
                  {new Date(typedPost.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>
              )}
              {typedPost.reading_time && <span>{typedPost.reading_time} min read</span>}
            </div>
          </header>

          {/* Cover image */}
          {typedPost.cover_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={typedPost.cover_url} alt={typedPost.title} style={{ width: "100%", borderRadius: "12px", marginBottom: "40px", objectFit: "cover", maxHeight: "460px" }} />
          )}

          {/* Post content */}
          <div
            className="tiptap-content"
            dangerouslySetInnerHTML={{ __html: typedPost.content_html || "" }}
            style={{ fontSize: "1.0625rem", lineHeight: 1.8 }}
          />

          {/* Like + Share */}
          <div style={{ borderTop: "1px solid var(--gray-100)", paddingTop: "32px", marginTop: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <LikeButton postId={typedPost.id} initialCount={likeCount ?? 0} />
              <span style={{ color: "var(--gray-400)", fontSize: "0.875rem" }}>
                {likeCount ?? 0} {(likeCount ?? 0) === 1 ? "like" : "likes"}
              </span>
            </div>
            <ShareButtons
              title={typedPost.title}
              excerpt={typedPost.excerpt ?? ""}
              slug={typedPost.slug}
            />
          </div>

          {/* Comments */}
          <CommentsSection postId={typedPost.id} postSlug={typedPost.slug} initialComments={typedComments} />
        </article>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© 2026 Andrew Urom. Built with craft.</span>
          <span>Lagos, Nigeria</span>
        </div>
      </footer>
    </>
  );
}
