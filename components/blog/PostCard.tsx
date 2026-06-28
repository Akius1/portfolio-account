"use client";
import type { Post } from "@/types/blog";
import Link from "next/link";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <article style={{
        background: "var(--white)",
        border: "1px solid var(--gray-100)",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out)",
        cursor: "pointer",
      }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(20,20,18,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {post.cover_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_url}
            alt={post.title}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
        )}
        <div style={{ padding: "24px" }}>
          {post.tags.length > 0 && (
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} style={{
                  background: "var(--accent-light)", color: "var(--accent-blue)",
                  padding: "3px 10px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 500,
                }}>{tag}</span>
              ))}
            </div>
          )}
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--dark)",
            lineHeight: 1.3,
            marginBottom: "10px",
          }}>
            {post.title}
          </h2>
          {post.excerpt && (
            <p style={{
              color: "var(--gray-600)",
              fontSize: "0.9rem",
              lineHeight: 1.6,
              marginBottom: "16px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {post.excerpt}
            </p>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--gray-400)", fontSize: "0.8rem" }}>
            {post.published_at && (
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </time>
            )}
            {post.reading_time && <span>{post.reading_time} min read</span>}
          </div>
        </div>
      </article>
    </Link>
  );
}
