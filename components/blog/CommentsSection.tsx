"use client";
import { useState, useEffect } from "react";
import type { Comment } from "@/types/blog";
import { createClient } from "@/lib/supabase/client";

interface Props {
  postId: string;
  postSlug: string;
  initialComments: Comment[];
}

export default function CommentsSection({ postId, postSlug, initialComments }: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [body, setBody] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<{ id: string; user_metadata: { avatar_url?: string; user_name?: string } } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const supabase = createClient();

  // Get current user
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user as typeof user);
    });
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel(`comments:${postId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments", filter: `post_id=eq.${postId}` },
        async (payload) => {
          const newComment = payload.new as Comment;
          if (!newComment.is_approved) return;
          // Fetch with author info
          const { data } = await supabase
            .from("comments")
            .select("*, author:profiles(username, avatar_url)")
            .eq("id", newComment.id)
            .single();
          if (data) setComments((prev) => [...prev, data as Comment]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "comments", filter: `post_id=eq.${postId}` },
        async (payload) => {
          const updated = payload.new as Comment;
          if (!updated.is_approved) return;
          const { data } = await supabase
            .from("comments")
            .select("*, author:profiles(username, avatar_url)")
            .eq("id", updated.id)
            .single();
          if (data) {
            setComments((prev) =>
              prev.some((c) => c.id === updated.id)
                ? prev.map((c) => (c.id === updated.id ? (data as Comment) : c))
                : [...prev, data as Comment]
            );
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [postId]);  // eslint-disable-line react-hooks/exhaustive-deps

  const handleSignIn = async (provider: "github" | "google") => {
    const base = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${base}/auth/callback?next=/blog/${postSlug}` },
    });
  };

  const submit = async (parentId?: string) => {
    const text = parentId ? replyBody : body;
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/posts/${postSlug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: text.trim(), parent_id: parentId ?? null }),
      });
      if (res.ok) {
        if (parentId) { setReplyBody(""); setReplyTo(null); }
        else { setBody(""); setSubmitted(true); }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const topLevel = comments.filter((c) => !c.parent_id);
  const getReplies = (id: string) => comments.filter((c) => c.parent_id === id);

  return (
    <section style={{ marginTop: "48px", borderTop: "1px solid var(--gray-100)", paddingTop: "40px" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "32px", color: "var(--dark)" }}>
        Comments ({topLevel.length})
      </h2>

      {/* Comment form */}
      {user ? (
        <form onSubmit={(e) => { e.preventDefault(); submit(); }} style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            {user.user_metadata.avatar_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.user_metadata.avatar_url} alt="You" style={{ width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0 }} />
            )}
            <div style={{ flex: 1 }}>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                maxLength={2000}
                style={{
                  width: "100%", padding: "12px 16px",
                  border: "1px solid var(--gray-200)", borderRadius: "10px",
                  fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--dark)",
                  resize: "vertical", outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent-blue)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--gray-200)")}
              />
              {submitted && <p style={{ fontSize: "0.8rem", color: "var(--green)", marginTop: "6px" }}>Comment submitted! It&apos;ll appear after review.</p>}
              <button
                type="submit"
                disabled={!body.trim() || submitting}
                style={{
                  marginTop: "8px", padding: "8px 20px",
                  background: "var(--dark)", color: "var(--white)",
                  border: "none", borderRadius: "8px", cursor: "pointer",
                  fontSize: "0.875rem", fontWeight: 600,
                  opacity: !body.trim() || submitting ? 0.5 : 1,
                }}
              >
                {submitting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div style={{
          marginBottom: "40px", padding: "20px", background: "var(--light)",
          borderRadius: "12px", textAlign: "center",
        }}>
          <p style={{ color: "var(--gray-600)", marginBottom: "14px" }}>Sign in to leave a comment</p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => handleSignIn("github")}
              style={{
                padding: "10px 20px", background: "#24292f", color: "#ffffff",
                border: "none", borderRadius: "8px", cursor: "pointer",
                fontSize: "0.85rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "8px",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              GitHub
            </button>
            <button
              onClick={() => handleSignIn("google")}
              style={{
                padding: "10px 20px", background: "var(--white)", color: "var(--dark)",
                border: "1px solid var(--gray-200)", borderRadius: "8px", cursor: "pointer",
                fontSize: "0.85rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "8px",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
          </div>
        </div>
      )}

      {/* Comments list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {topLevel.length === 0 && (
          <p style={{ color: "var(--gray-400)", textAlign: "center", padding: "20px 0" }}>
            No comments yet. Be the first!
          </p>
        )}
        {topLevel.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            replies={getReplies(comment.id)}
            replyTo={replyTo}
            replyBody={replyBody}
            setReplyTo={setReplyTo}
            setReplyBody={setReplyBody}
            onSubmitReply={() => submit(comment.id)}
            submitting={submitting}
            user={user}
            onSignIn={handleSignIn}
          />
        ))}
      </div>
    </section>
  );
}

function CommentItem({
  comment, replies, replyTo, replyBody, setReplyTo, setReplyBody, onSubmitReply, submitting, user, onSignIn,
}: {
  comment: Comment;
  replies: Comment[];
  replyTo: string | null;
  replyBody: string;
  setReplyTo: (id: string | null) => void;
  setReplyBody: (v: string) => void;
  onSubmitReply: () => void;
  submitting: boolean;
  user: { id: string; user_metadata: { avatar_url?: string } } | null;
  onSignIn: (provider: "github" | "google") => void;
}) {
  return (
    <div>
      <div style={{ display: "flex", gap: "12px" }}>
        {comment.author?.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={comment.author.avatar_url} alt={comment.author.username ?? ""} style={{ width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0 }} />
        ) : (
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--gray-100)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", fontWeight: 700, color: "var(--gray-400)" }}>
            {(comment.author?.username ?? "?")[0].toUpperCase()}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px" }}>
            <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--dark)" }}>{comment.author?.username ?? "Anonymous"}</span>
            <time style={{ fontSize: "0.8rem", color: "var(--gray-400)" }}>
              {new Date(comment.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </time>
          </div>
          <p style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.6 }}>{comment.body}</p>
          <button
            onClick={() => user ? setReplyTo(replyTo === comment.id ? null : comment.id) : onSignIn("google")}
            style={{ marginTop: "8px", background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem", color: "var(--accent-blue)", fontWeight: 500 }}
          >
            {replyTo === comment.id ? "Cancel" : "Reply"}
          </button>

          {replyTo === comment.id && (
            <div style={{ marginTop: "12px" }}>
              <textarea
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                placeholder="Write a reply..."
                rows={2}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--gray-200)", borderRadius: "8px", fontFamily: "var(--font-sans)", fontSize: "0.875rem", resize: "vertical", outline: "none" }}
              />
              <button
                onClick={onSubmitReply}
                disabled={!replyBody.trim() || submitting}
                style={{ marginTop: "6px", padding: "7px 16px", background: "var(--dark)", color: "var(--white)", border: "none", borderRadius: "7px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, opacity: !replyBody.trim() || submitting ? 0.5 : 1 }}
              >
                Post Reply
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nested replies */}
      {replies.length > 0 && (
        <div style={{ marginLeft: "48px", marginTop: "16px", paddingLeft: "16px", borderLeft: "2px solid var(--gray-100)" }}>
          {replies.map((reply) => (
            <div key={reply.id} style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
              {reply.author?.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={reply.author.avatar_url} alt="" style={{ width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0 }} />
              ) : (
                <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "var(--gray-100)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "var(--gray-400)" }}>
                  {(reply.author?.username ?? "?")[0].toUpperCase()}
                </div>
              )}
              <div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--dark)" }}>{reply.author?.username ?? "Anonymous"}</span>
                  <time style={{ fontSize: "0.75rem", color: "var(--gray-400)" }}>
                    {new Date(reply.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </time>
                </div>
                <p style={{ color: "var(--gray-600)", fontSize: "0.875rem", lineHeight: 1.6 }}>{reply.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
