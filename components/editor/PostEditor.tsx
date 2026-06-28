"use client";
import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { Post } from "@/types/blog";

const TiptapEditor = dynamic(() => import("./TiptapEditor"), { ssr: false });

interface Props {
  post?: Post;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function readingTime(html: string) {
  const words = html.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function PostEditor({ post }: Props) {
  const isEdit = !!post;
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState(post?.title || "");
  const [subtitle, setSubtitle] = useState(post?.subtitle || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [tags, setTags] = useState(post?.tags.join(", ") || "");
  const [coverUrl, setCoverUrl] = useState(post?.cover_url || "");
  const [content, setContent] = useState<object>(post?.content || {});
  const [contentHtml, setContentHtml] = useState(post?.content_html || "");
  const [saving, setSaving] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);

  const handleContentChange = useCallback((json: object, html: string) => {
    setContent(json);
    setContentHtml(html);
  }, []);

  const uploadCover = async (file: File) => {
    setCoverUploading(true);
    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(`covers/${Date.now()}-${file.name}`, file, { upsert: false });
    if (!error && data) {
      const { data: { publicUrl } } = supabase.storage.from("blog-images").getPublicUrl(data.path);
      setCoverUrl(publicUrl);
    }
    setCoverUploading(false);
  };

  const save = async (status: "draft" | "published") => {
    if (!title.trim()) { alert("Title is required"); return; }
    setSaving(true);

    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim() || null,
      slug: isEdit ? post.slug : slugify(title),
      excerpt: excerpt.trim() || null,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      cover_url: coverUrl || null,
      content,
      content_html: contentHtml,
      reading_time: readingTime(contentHtml),
      status,
      published_at: status === "published" ? (post?.published_at || new Date().toISOString()) : null,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (isEdit) {
      ({ error } = await supabase.from("posts").update(payload).eq("id", post.id));
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      ({ error } = await supabase.from("posts").insert({ ...payload, author_id: user?.id }));
    }

    setSaving(false);
    if (error) { alert("Error saving: " + error.message); return; }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, color: "var(--dark)" }}>
          {isEdit ? "Edit Post" : "New Post"}
        </h1>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => save("draft")}
            disabled={saving}
            style={{ padding: "10px 20px", background: "var(--white)", border: "1px solid var(--gray-200)", borderRadius: "8px", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600, color: "var(--gray-600)" }}
          >
            {saving ? "Saving…" : "Save Draft"}
          </button>
          <button
            onClick={() => save("published")}
            disabled={saving}
            style={{ padding: "10px 20px", background: "var(--dark)", color: "var(--white)", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600 }}
          >
            {saving ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "24px", alignItems: "start" }}>
        {/* Main editor */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title…"
            style={{
              width: "100%", padding: "14px 16px",
              fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700,
              border: "1px solid var(--gray-200)", borderRadius: "10px",
              outline: "none", color: "var(--dark)",
            }}
          />
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle (optional)…"
            style={{
              width: "100%", padding: "10px 14px",
              fontFamily: "var(--font-sans)", fontSize: "1rem",
              border: "1px solid var(--gray-200)", borderRadius: "8px",
              outline: "none", color: "var(--gray-600)",
            }}
          />
          <TiptapEditor
            content={isEdit && post.content ? post.content : undefined}
            onChange={handleContentChange}
          />
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Cover image */}
          <div style={{ background: "var(--white)", border: "1px solid var(--gray-200)", borderRadius: "12px", padding: "16px" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--gray-600)", display: "block", marginBottom: "10px" }}>Cover Image</label>
            {coverUrl ? (
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverUrl} alt="Cover" style={{ width: "100%", borderRadius: "8px", marginBottom: "8px", objectFit: "cover", height: "140px" }} />
                <button onClick={() => setCoverUrl("")} style={{ fontSize: "0.75rem", color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}>Remove</button>
              </div>
            ) : (
              <label style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                padding: "24px", border: "2px dashed var(--gray-200)", borderRadius: "8px",
                cursor: "pointer", color: "var(--gray-400)", fontSize: "0.8rem", gap: "6px",
              }}>
                {coverUploading ? "Uploading…" : "Click to upload cover"}
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCover(f); }} />
              </label>
            )}
          </div>

          {/* Excerpt */}
          <div style={{ background: "var(--white)", border: "1px solid var(--gray-200)", borderRadius: "12px", padding: "16px" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--gray-600)", display: "block", marginBottom: "8px" }}>Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short description for the post card…"
              rows={3}
              style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--gray-200)", borderRadius: "8px", fontFamily: "var(--font-sans)", fontSize: "0.8rem", resize: "vertical", outline: "none", color: "var(--dark)" }}
            />
          </div>

          {/* Tags */}
          <div style={{ background: "var(--white)", border: "1px solid var(--gray-200)", borderRadius: "12px", padding: "16px" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--gray-600)", display: "block", marginBottom: "8px" }}>Tags (comma separated)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="TypeScript, React, AI…"
              style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--gray-200)", borderRadius: "8px", fontFamily: "var(--font-sans)", fontSize: "0.8rem", outline: "none", color: "var(--dark)" }}
            />
          </div>

          {/* Slug preview */}
          <div style={{ background: "var(--white)", border: "1px solid var(--gray-200)", borderRadius: "12px", padding: "16px" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--gray-600)", display: "block", marginBottom: "6px" }}>URL Slug</label>
            <span style={{ fontSize: "0.8rem", color: "var(--accent-blue)", wordBreak: "break-all" }}>
              /blog/{isEdit ? post.slug : (title ? slugify(title) : "your-post-slug")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
