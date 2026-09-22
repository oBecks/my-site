// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { UIMessage } from "ai";
import { AssistantWidget } from "@/components/assistant/assistant-widget";

const sendMessage = vi.fn();
let messages: UIMessage[] = [];

vi.mock("@ai-sdk/react", () => ({
  useChat: () => ({
    messages,
    sendMessage,
    status: "ready",
    error: undefined,
    regenerate: vi.fn(),
  }),
}));

// Motion's exit animations never finish in jsdom; render straight through.
vi.mock("motion/react", async () => {
  const { forwardRef, createElement } = await import("react");
  const Div = forwardRef<HTMLDivElement, Record<string, unknown>>(
    function Div(props, ref) {
      const motionProps = ["initial", "animate", "exit", "transition"];
      const domProps = Object.fromEntries(
        Object.entries(props).filter(([key]) => !motionProps.includes(key))
      );
      return createElement("div", { ...domProps, ref });
    }
  );
  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    motion: { div: Div },
    useReducedMotion: () => true,
  };
});

beforeEach(() => {
  messages = [];
  sendMessage.mockClear();
});

afterEach(cleanup);

async function openAssistant() {
  const user = userEvent.setup();
  render(<AssistantWidget />);
  await user.click(screen.getByRole("button", { name: "Ask about Omer" }));
  return user;
}

describe("AssistantWidget", () => {
  it("starts closed", () => {
    render(<AssistantWidget />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens with the question box focused", async () => {
    await openAssistant();

    expect(
      screen.getByRole("dialog", { name: "Ask about Omer" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Your question")).toHaveFocus();
  });

  it("closes on Escape and returns focus to the toggle", async () => {
    const user = await openAssistant();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ask about Omer" })
    ).toHaveFocus();
  });

  it("closes from the header button", async () => {
    const user = await openAssistant();

    const [headerClose] = screen.getAllByRole("button", {
      name: "Close assistant",
    });
    await user.click(headerClose);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("asks a starter question in one click", async () => {
    const user = await openAssistant();

    await user.click(
      screen.getByRole("button", { name: "What has Omer built?" })
    );

    expect(sendMessage).toHaveBeenCalledWith({ text: "What has Omer built?" });
  });

  it("sends a typed question on Enter", async () => {
    const user = await openAssistant();

    await user.type(
      screen.getByLabelText("Your question"),
      "What does he do at Rapyd?{Enter}"
    );

    expect(sendMessage).toHaveBeenCalledWith({
      text: "What does he do at Rapyd?",
    });
  });

  it("does not send an empty question", async () => {
    const user = await openAssistant();

    await user.type(screen.getByLabelText("Your question"), "   {Enter}");

    expect(sendMessage).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", { name: "Send question" })
    ).toBeDisabled();
  });

  it("tells Visitors that chats are saved, with a link to /privacy", async () => {
    await openAssistant();

    expect(screen.getByText(/Chats are saved for 90 days/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute(
      "href",
      "/privacy"
    );
  });

  it("renders the Conversation instead of the starters once it begins", async () => {
    messages = [
      { id: "1", role: "user", parts: [{ type: "text", text: "Hi!" }] },
      {
        id: "2",
        role: "assistant",
        parts: [{ type: "text", text: "Omer built **Commit Pet**." }],
      },
    ];

    await openAssistant();

    expect(screen.getByText("Hi!")).toBeInTheDocument();
    expect(screen.getByText("Commit Pet").tagName).toBe("STRONG");
    expect(
      screen.queryByRole("button", { name: "What has Omer built?" })
    ).not.toBeInTheDocument();
  });
});
