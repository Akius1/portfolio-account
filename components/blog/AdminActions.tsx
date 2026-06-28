"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface Props {
  postId?: string;
  commentId?: string;
}

export default function AdminActions({ postId, commentId }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const approveComment = async () => {
    if (!commentId) return;
    setLoading(true);
    await supabase.from("comments").update({ is_approved: true }).eq("id", commentId);
    router.refresh();
    setLoading(false);
  };

  const deleteComment = async () => {
    if (!commentId || !confirm("Delete this comment?")) return;
    setLoading(true);
    await supabase.from("comments").delete().eq("id", commentId);
    router.refresh();
    setLoading(false);
  };

  const deletePost = async () => {
    if (!postId || !confirm("Delete this post? This cannot be undone.")) return;
    setLoading(true);
    await supabase.from("posts").delete().eq("id", postId);
    router.refresh();
    setLoading(false);
  };

  if (commentId) {
    return (
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={approveComment} disabled={loading} style={{ padding: "5px 12px", background: "#dcfce7", color: "#16a34a", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>
          Approve
        </button>
        <button onClick={deleteComment} disabled={loading} style={{ padding: "5px 12px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>
          Delete
        </button>
      </div>
    );
  }

  return (
    <button onClick={deletePost} disabled={loading} style={{ fontSize: "0.875rem", color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}>
      Delete
    </button>
  );
}
