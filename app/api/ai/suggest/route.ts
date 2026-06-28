import { anthropic } from "@/lib/claude";

export const runtime = "edge";

export async function POST(req: Request) {
  const { selectedText, instruction, context } = await req.json();

  if (!instruction) {
    return new Response("Missing instruction", { status: 400 });
  }

  const stream = anthropic.messages.stream({
    model: "claude-opus-4-8",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a writing assistant for a developer portfolio blog written by Andrew Urom, a Senior Frontend Engineer.

${context ? `Surrounding context:\n${context}\n\n` : ""}${selectedText ? `Selected text to work with:\n${selectedText}\n\n` : ""}Instruction: ${instruction}

${selectedText ? "Rewrite the selected text following the instruction. Return ONLY the replacement text, nothing else." : "Write the requested content. Return ONLY the content, nothing else."}`,
      },
    ],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
