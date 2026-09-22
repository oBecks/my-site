# Log Assistant Conversations for 90 days, anonymously

The Assistant saves each question and answer to Neon Postgres, grouped by a random per-page-load Conversation ID. The logs never include IPs or any Visitor identity, and a daily Vercel Cron job deletes them after 90 days. The point is to see what Visitors actually ask, so gaps in the Knowledge can be filled. We picked a one-line notice in the chat that links to `/privacy`, not a consent popup, because a modal would put Visitors off using the Assistant at all. The retention period is a promise on `/privacy`: shortening it later is safe, but lengthening it, or starting to log identity, means updating that page first.

## Considered Options

- **Don't log.** This is what the reference implementation (haco29/personal-website) does, and it's the simplest option, but it leaves no way to learn what Visitors ask.
- **Upstash Redis with per-key TTL.** Expiry is built in and no cron job is needed, but its console is poor for reading and searching Conversations.
- **Vercel runtime logs.** They cost nothing to set up, but Vercel keeps them for too short a time on the Hobby plan to be useful.
