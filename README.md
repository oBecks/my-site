# my-site

Omer Beck's portfolio, live at [obeck.dev](https://obeck.dev). It's built with Next.js (App Router), Tailwind CSS, shadcn/ui and Motion, and deployed on Vercel. Domain terms live in [CONTEXT.md](CONTEXT.md), and decisions in [docs/adr](docs/adr).

## Development

```bash
pnpm install
pnpm dev          # site only; the Assistant answers with an error
pnpm dev:vercel   # site + working Assistant (needs the one-time setup below)
pnpm check        # lint, format, types, tests (what CI runs)
```

## The Assistant

A floating "Ask about Omer" chat on every page. `app/api/chat/route.ts` streams answers from Claude Haiku through the Vercel AI Gateway. The Assistant only knows what's in `lib/projects.ts`, `lib/profile.ts` and `lib/site-config.ts`, rebuilt into its instructions on every request (`lib/assistant/instructions.ts`). Adding a Project updates the Assistant on the next deploy.

### One-time setup

1. **Link the folder to Vercel** so local dev gets the AI Gateway token:
   ```bash
   pnpm exec vercel login
   pnpm exec vercel link
   ```
2. **Add Neon** in Vercel → Storage → Neon (free), connected to this project. That sets `DATABASE_URL`. Then run [`db/schema.sql`](db/schema.sql) once in the Neon SQL editor.
3. **Set `CRON_SECRET`** in Vercel → Settings → Environment Variables (any long random string). It protects the daily job that deletes logs older than 90 days.
4. **Cap spend**: in Vercel → AI Gateway, set a monthly budget.
5. **Rate-limit** in Vercel → Firewall: add a rule for path `/api/chat` limiting to about 10 requests per minute per IP.

### Reading Conversation logs

In the Neon SQL editor:

```sql
SELECT created_at, conversation_id, question, answer
FROM conversation_logs
ORDER BY created_at DESC
LIMIT 100;
```

Logs are anonymous and expire after 90 days. See [ADR 0001](docs/adr/0001-log-assistant-conversations.md) and `/privacy`.

<!-- Gemini review test run 2, do not merge. -->
