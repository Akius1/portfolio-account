"use client";
import { useState, useEffect } from "react";

interface Props {
  postId: string;
  initialCount: number;
}

export default function LikeButton({ postId, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Restore liked state from localStorage
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    setLiked(!!likedPosts[postId]);
  }, [postId]);

  const handleLike = async () => {
    if (loading || liked) return;
    setLoading(true);

    // Optimistic update
    setLiked(true);
    setCount((c) => c + 1);

    try {
      // Get or generate fingerprint
      let fp = localStorage.getItem("anon_fp");
      if (!fp) {
        const { default: FingerprintJS } = await import("@fingerprintjs/fingerprintjs");
        const agent = await FingerprintJS.load();
        const result = await agent.get();
        fp = result.visitorId;
        localStorage.setItem("anon_fp", fp);
      }

      const slug = window.location.pathname.split("/").pop();
      const res = await fetch(`/api/posts/${slug}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint: fp }),
      });

      if (res.ok) {
        const { count: serverCount } = await res.json();
        setCount(serverCount);
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
        likedPosts[postId] = true;
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      } else {
        // Revert
        setLiked(false);
        setCount((c) => c - 1);
      }
    } catch {
      setLiked(false);
      setCount((c) => c - 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked || loading}
      aria-label="Like this post"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: liked ? "var(--accent-light)" : "var(--light)",
        border: `1px solid ${liked ? "var(--accent-blue)" : "var(--gray-200)"}`,
        borderRadius: "50px",
        padding: "8px 18px",
        cursor: liked ? "default" : "pointer",
        transition: "all 0.2s var(--ease-out)",
        fontSize: "0.9rem",
        color: liked ? "var(--accent-blue)" : "var(--gray-600)",
        fontWeight: 500,
      }}
    >
      <span style={{ fontSize: "1.1rem" }}>{liked ? "❤️" : "🤍"}</span>
      {count}
    </button>
  );
}
