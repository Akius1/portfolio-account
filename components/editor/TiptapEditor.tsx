"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import { Typography } from "@tiptap/extension-typography";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { common, createLowlight } from "lowlight";
import { createClient } from "@/lib/supabase/client";
import AiAssistPanel from "./AiAssistPanel";
import { useState, useCallback } from "react";

const lowlight = createLowlight(common);

interface Props {
  content?: object;
  onChange?: (json: object, html: string) => void;
}

const TOOLBAR_BTN: React.CSSProperties = {
  background: "none",
  border: "1px solid var(--gray-200)",
  borderRadius: "6px",
  padding: "5px 10px",
  cursor: "pointer",
  fontSize: "0.8rem",
  color: "var(--gray-600)",
  fontWeight: 500,
};

export default function TiptapEditor({ content, onChange }: Props) {
  const [aiOpen, setAiOpen] = useState(false);
  const supabase = createClient();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Start writing your post…" }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Typography,
      Underline,
      TextStyle,
      Color,
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON(), editor.getHTML());
    },
  });

  const uploadImage = useCallback(async (file: File) => {
    if (!editor) return;
    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(`posts/${Date.now()}-${file.name}`, file, { upsert: false });
    if (error || !data) { alert("Image upload failed"); return; }
    const { data: { publicUrl } } = supabase.storage.from("blog-images").getPublicUrl(data.path);
    editor.chain().focus().setImage({ src: publicUrl }).run();
  }, [editor, supabase]);

  const handleImagePaste = useCallback((e: React.ClipboardEvent) => {
    const items = Array.from(e.clipboardData?.items || []);
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) uploadImage(file);
      }
    }
  }, [uploadImage]);

  const handleImageDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    files.forEach(uploadImage);
  }, [uploadImage]);

  if (!editor) return null;

  const btn = (active: boolean) => ({
    ...TOOLBAR_BTN,
    background: active ? "var(--light)" : "none",
    color: active ? "var(--dark)" : "var(--gray-600)",
    borderColor: active ? "var(--gray-200)" : "var(--gray-200)",
  });

  return (
    <div style={{ border: "1px solid var(--gray-200)", borderRadius: "12px", overflow: "hidden", background: "var(--white)" }}>
      {/* Toolbar */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: "4px", padding: "10px 12px",
        borderBottom: "1px solid var(--gray-100)", background: "var(--light)",
        alignItems: "center",
      }}>
        <button style={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold"><strong>B</strong></button>
        <button style={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><em>I</em></button>
        <button style={btn(editor.isActive("underline"))} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline"><u>U</u></button>
        <button style={btn(editor.isActive("strike"))} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strike"><s>S</s></button>

        <div style={{ width: "1px", height: "20px", background: "var(--gray-200)", margin: "0 4px" }} />

        <button style={btn(editor.isActive("heading", { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button style={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button style={btn(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>

        <div style={{ width: "1px", height: "20px", background: "var(--gray-200)", margin: "0 4px" }} />

        <button style={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">• List</button>
        <button style={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">1. List</button>
        <button style={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote">❝</button>
        <button style={btn(editor.isActive("codeBlock"))} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Code block">{"</>"}</button>
        <button style={btn(editor.isActive("code"))} onClick={() => editor.chain().focus().toggleCode().run()} title="Inline code">`code`</button>

        <div style={{ width: "1px", height: "20px", background: "var(--gray-200)", margin: "0 4px" }} />

        <button
          style={TOOLBAR_BTN}
          title="Insert link"
          onClick={() => {
            const url = window.prompt("URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >🔗</button>

        <label style={{ ...TOOLBAR_BTN, display: "inline-flex", alignItems: "center" }} title="Upload image">
          🖼
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadImage(file);
          }} />
        </label>

        <button
          style={TOOLBAR_BTN}
          title="Insert table"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        >⊞ Table</button>

        <button style={TOOLBAR_BTN} onClick={() => editor.chain().focus().undo().run()} title="Undo">↩</button>
        <button style={TOOLBAR_BTN} onClick={() => editor.chain().focus().redo().run()} title="Redo">↪</button>

        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={() => setAiOpen((o) => !o)}
            style={{
              ...TOOLBAR_BTN,
              background: aiOpen ? "var(--accent-blue)" : "var(--dark)",
              color: "var(--white)",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            ✦ AI Assist
          </button>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "400px" }}>
        {/* Editor area */}
        <div
          style={{ flex: 1, padding: "24px", overflowY: "auto" }}
          onPaste={handleImagePaste}
          onDrop={handleImageDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <EditorContent
            editor={editor}
            className="tiptap-content"
            style={{ outline: "none", minHeight: "360px" }}
          />
        </div>

        {/* AI Panel */}
        {aiOpen && (
          <AiAssistPanel
            editor={editor}
            onClose={() => setAiOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
