// The model the Assistant talks to, as a Vercel AI Gateway slug. CHAT_MODEL
// swaps it from the Vercel dashboard without a deploy, which matters when the
// gateway retires a slug. Haiku is plenty for answering from a fixed Knowledge.
export const DEFAULT_CHAT_MODEL = "anthropic/claude-haiku-4.5";

export const CHAT_MODEL = process.env.CHAT_MODEL || DEFAULT_CHAT_MODEL;

// Keeps answers short and caps the worst-case cost of a single reply.
export const MAX_ANSWER_TOKENS = 600;
