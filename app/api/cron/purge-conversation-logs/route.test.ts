import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/assistant/conversation-log", () => ({
  deleteExpiredConversationLogs: vi.fn(async () => 3),
}));

const { GET } = await import("./route");

function request(authorization?: string) {
  return new Request("http://localhost/api/cron/purge-conversation-logs", {
    headers: authorization ? { authorization } : {},
  });
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("purge-conversation-logs cron", () => {
  it("refuses requests without the cron secret", async () => {
    vi.stubEnv("CRON_SECRET", "s3cret");
    expect((await GET(request())).status).toBe(401);
    expect((await GET(request("Bearer wrong"))).status).toBe(401);
  });

  it("refuses everything when no secret is configured", async () => {
    vi.stubEnv("CRON_SECRET", "");
    expect((await GET(request("Bearer "))).status).toBe(401);
  });

  it("deletes expired logs when called by Vercel Cron", async () => {
    vi.stubEnv("CRON_SECRET", "s3cret");

    const response = await GET(request("Bearer s3cret"));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ deleted: 3 });
  });
});
