import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/types/blog";
import PostCard from "@/components/blog/PostCard";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog — Andrew Urom",
  description: "Thoughts on frontend engineering, design systems, AI, and building at scale.",
};

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, slug, title, subtitle, cover_url, excerpt, tags, reading_time, published_at, author_id")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <>
      <nav className="nav scrolled" id="nav" style={{ position: "fixed" }}>
        <Link href="/" className="nav-logo">Andrew Urom</Link>
        <div className="nav-links">
          <Link href="/#about" className="nav-link">About</Link>
          <Link href="/#experience" className="nav-link">Experience</Link>
          <Link href="/#projects" className="nav-link">Projects</Link>
          <Link href="/#contact" className="nav-link">Contact</Link>
          <Link href="/blog" className="nav-link" style={{ color: "var(--dark)" }}>Blog</Link>
        </div>
        <a href="mailto:andrewurom@gmail.com" className="nav-cta magnetic">Hire Me</a>
      </nav>

      <main style={{ paddingTop: "calc(var(--nav-h) + 48px)", minHeight: "100vh" }}>
        <div className="container" style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: "56px" }}>
            <span className="section-tag">Writing</span>
            <h1 className="section-title" style={{ marginTop: "12px" }}>
              Thoughts &amp; ideas<br /><em>from the trenches.</em>
            </h1>
            <p style={{ color: "var(--gray-600)", marginTop: "16px", maxWidth: "520px", lineHeight: 1.7 }}>
              Frontend engineering, design systems, AI, and building products at scale in Africa&apos;s fintech ecosystem.
            </p>
          </div>

          {!posts || posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--gray-400)" }}>
              <p style={{ fontSize: "1.1rem" }}>No posts yet. Check back soon.</p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "32px",
              paddingBottom: "80px",
            }}>
              {(posts as Post[]).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
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
