import { after } from "next/server";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from "ai";
import { parseChatRequest } from "@/lib/assistant/chat-request";
import { buildInstructions } from "@/lib/assistant/instructions";
import { CHAT_MODEL, MAX_ANSWER_TOKENS } from "@/lib/assistant/model";
import { saveConversationLog } from "@/lib/assistant/conversation-log";

// Auth: the AI Gateway reads VERCEL_OIDC_TOKEN, which Vercel injects in
// deployments and `pnpm dev:vercel` provides locally once the folder is linked.
export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const parsed = parseChatRequest(body);
  if (!parsed.ok) {
    return new Response(parsed.error, { status: 400 });
  }
  const { conversationId, messages, question } = parsed.request;

  // Resolves with the answer once the stream ends, or null if it never does.
  let settle: (answer: string | null) => void = () => {};
  const answer = new Promise<string | null>((resolve) => (settle = resolve));

  const result = streamText({
    model: CHAT_MODEL,
    instructions: buildInstructions(),
    messages: await convertToModelMessages(messages),
    maxOutputTokens: MAX_ANSWER_TOKENS,
    onEnd: ({ text }) => settle(text),
    onAbort: () => settle(null),
    onError: ({ error }) => {
      console.error("Assistant stream error:", error);
      settle(null);
    },
  });

  // Logging runs after the response is sent and never affects the Visitor.
  after(async () => {
    const text = await answer;
    if (!text) return;
    try {
      await saveConversationLog({
        conversationId,
        question,
        answer: text,
        model: CHAT_MODEL,
      });
    } catch (error) {
      console.error("Failed to save conversation log:", error);
    }
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: () =>
        "The Assistant is having a moment. Please try again in a bit.",
    }),
  });
}
