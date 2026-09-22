-- Run once in the Neon SQL editor after adding Neon to the Vercel project.

CREATE TABLE IF NOT EXISTS conversation_logs (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  conversation_id text NOT NULL,
  question text NOT NULL,
  answer text NOT NULL,
  model text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS conversation_logs_created_at_idx
  ON conversation_logs (created_at);

-- Reading logs, newest first (each Conversation shares a conversation_id):
--
--   SELECT created_at, conversation_id, question, answer
--   FROM conversation_logs
--   ORDER BY created_at DESC
--   LIMIT 100;
