"use client";
import { useState } from "react";
import type { Editor } from "@tiptap/react";

interface Props {
  editor: Editor;
  onClose: () => void;
}

const PRESETS = [
  "Make this more concise",
  "Improve clarity and flow",
  "Fix grammar and spelling",
  "Make it more engaging",
  "Add a technical example",
  "Expand with more detail",
  "Simplify the language",
];

export default function AiAssistPanel({ editor, onClose }: Props) {
  const [instruction, setInstruction] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedText = editor.state.selection.empty
    ? ""
    : editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to,
        " "
      );

  const generate = async (customInstruction?: string) => {
    const inst = customInstruction || instruction;
    if (!inst.trim()) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedText,
          instruction: inst,
          context: editor.getText().slice(0, 500),
        }),
      });

      if (!res.ok) { setOutput("Error: " + (await res.text())); return; }
      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        setOutput(result);
      }
    } finally {
      setLoading(false);
    }
  };

  const accept = () => {
    if (!output) return;
    if (selectedText) {
      editor.chain().focus().insertContent(output).run();
    } else {
      editor.chain().focus().insertContent(output).run();
    }
    setOutput("");
    setInstruction("");
  };

  return (
    <div style={{
      width: "320px",
      borderLeft: "1px solid var(--gray-100)",
      display: "flex",
      flexDirection: "column",
      background: "var(--light)",
      flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{
        padding: "14px 16px",
        borderBottom: "1px solid var(--gray-100)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "var(--white)",
      }}>
        <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--dark)", display: "flex", alignItems: "center", gap: "6px" }}>
          ✦ Claude AI Assist
        </span>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: "var(--gray-400)" }}>×</button>
      </div>

      <div style={{ padding: "16px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Selected text preview */}
        {selectedText && (
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--gray-400)", marginBottom: "4px", fontWeight: 600 }}>SELECTED TEXT</div>
            <div style={{
              background: "var(--white)",
              border: "1px solid var(--gray-200)",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "0.8rem",
              color: "var(--gray-600)",
              maxHeight: "80px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}>
              {selectedText}
            </div>
          </div>
        )}

        {/* Preset prompts */}
        <div>
          <div style={{ fontSize: "0.75rem", color: "var(--gray-400)", marginBottom: "6px", fontWeight: 600 }}>QUICK ACTIONS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => { setInstruction(preset); generate(preset); }}
                disabled={loading}
                style={{
                  textAlign: "left",
                  background: "var(--white)",
                  border: "1px solid var(--gray-200)",
                  borderRadius: "7px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  color: "var(--gray-600)",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-blue)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--gray-200)")}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Custom instruction */}
        <div>
          <div style={{ fontSize: "0.75rem", color: "var(--gray-400)", marginBottom: "6px", fontWeight: 600 }}>CUSTOM INSTRUCTION</div>
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="e.g. Add a code example in TypeScript..."
            rows={2}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid var(--gray-200)",
              borderRadius: "8px",
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              resize: "none",
              outline: "none",
            }}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); generate(); } }}
          />
          <button
            onClick={() => generate()}
            disabled={!instruction.trim() || loading}
            style={{
              marginTop: "6px",
              width: "100%",
              padding: "9px",
              background: "var(--dark)",
              color: "var(--white)",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 600,
              opacity: !instruction.trim() || loading ? 0.5 : 1,
            }}
          >
            {loading ? "Generating…" : "Generate ↵"}
          </button>
        </div>

        {/* Output */}
        {(output || loading) && (
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--gray-400)", marginBottom: "6px", fontWeight: 600 }}>
              OUTPUT {loading && <span style={{ color: "var(--accent-blue)" }}>●</span>}
            </div>
            <div style={{
              background: "var(--white)",
              border: "1px solid var(--gray-200)",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "0.85rem",
              color: "var(--dark)",
              lineHeight: 1.6,
              minHeight: "60px",
              whiteSpace: "pre-wrap",
            }}>
              {output || <span style={{ color: "var(--gray-400)" }}>Thinking…</span>}
            </div>
            {output && !loading && (
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <button
                  onClick={accept}
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: "var(--accent-blue)",
                    color: "var(--white)",
                    border: "none",
                    borderRadius: "7px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  ✓ Accept
                </button>
                <button
                  onClick={() => { setOutput(""); setInstruction(""); }}
                  style={{
                    padding: "8px 12px",
                    background: "none",
                    border: "1px solid var(--gray-200)",
                    borderRadius: "7px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    color: "var(--gray-600)",
                  }}
                >
                  Discard
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
