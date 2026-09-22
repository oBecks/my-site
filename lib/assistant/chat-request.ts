import type { UIMessage } from "ai";

// Longest question a Visitor can send. The input enforces it too; this is the
// server-side guarantee.
export const MAX_QUESTION_LENGTH = 500;

// How much of the Conversation is sent to the model. Older messages are dropped
// rather than rejected, so a long Conversation keeps working at a bounded cost.
export const MAX_HISTORY_MESSAGES = 10;

// Anything bigger than this isn't a real Conversation.
const MAX_INCOMING_MESSAGES = 100;

const CONVERSATION_ID = /^[A-Za-z0-9_-]{1,64}$/;

export type ChatRequest = {
  conversationId: string;
  messages: UIMessage[];
  question: string;
};

export type ParseResult =
  { ok: true; request: ChatRequest } | { ok: false; error: string };

function textOf(message: UIMessage) {
  return message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("");
}

// Validates the body useChat posts, and rebuilds the history from text only:
// no client-supplied system messages, tool parts, or metadata reach the model.
export function parseChatRequest(body: unknown): ParseResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body" };
  }
  const { id, messages } = body as { id?: unknown; messages?: unknown };

  if (typeof id !== "string" || !CONVERSATION_ID.test(id)) {
    return { ok: false, error: "Invalid conversation id" };
  }
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > MAX_INCOMING_MESSAGES
  ) {
    return { ok: false, error: "Invalid messages" };
  }

  const history: UIMessage[] = [];
  for (const message of messages as UIMessage[]) {
    if (
      !message ||
      (message.role !== "user" && message.role !== "assistant") ||
      !Array.isArray(message.parts)
    ) {
      return { ok: false, error: "Invalid message" };
    }
    const text = textOf(message);
    if (message.role === "user" && text.length > MAX_QUESTION_LENGTH) {
      return { ok: false, error: "Question is too long" };
    }
    history.push({
      id: String(message.id),
      role: message.role,
      parts: [{ type: "text", text }],
    });
  }

  const last = history.at(-1)!;
  const question = textOf(last).trim();
  if (last.role !== "user" || question.length === 0) {
    return { ok: false, error: "The last message must be a question" };
  }

  return {
    ok: true,
    request: {
      conversationId: id,
      messages: history.slice(-MAX_HISTORY_MESSAGES),
      question,
    },
  };
}
