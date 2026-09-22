import { deleteExpiredConversationLogs } from "@/lib/assistant/conversation-log";

// Called daily by Vercel Cron (see vercel.json). Vercel sends CRON_SECRET as a
// bearer token, which keeps anyone else from triggering it.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const deleted = await deleteExpiredConversationLogs();
  return Response.json({ deleted });
}
