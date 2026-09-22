import { neon } from "@neondatabase/serverless";
import { LOG_RETENTION_DAYS } from "@/lib/assistant/conversation-log-policy";

export type ConversationLogEntry = {
  conversationId: string;
  question: string;
  answer: string;
  model: string;
};

// DATABASE_URL comes from the Neon integration on Vercel. Without it (local dev
// before `vercel env pull`), logging is skipped rather than breaking the chat.
function database() {
  const url = process.env.DATABASE_URL;
  return url ? neon(url) : null;
}

export async function saveConversationLog(entry: ConversationLogEntry) {
  const sql = database();
  if (!sql) return;

  await sql`
    INSERT INTO conversation_logs (conversation_id, question, answer, model)
    VALUES (${entry.conversationId}, ${entry.question}, ${entry.answer}, ${entry.model})
  `;
}

export async function deleteExpiredConversationLogs() {
  const sql = database();
  if (!sql) return 0;

  const deleted = await sql`
    DELETE FROM conversation_logs
    WHERE created_at < now() - make_interval(days => ${LOG_RETENTION_DAYS})
    RETURNING id
  `;
  return deleted.length;
}
