// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { UIMessage } from "ai";
import { AssistantWidget } from "@/components/assistant/assistant-widget";
import { openAssistant as openFromElsewhere } from "@/lib/assistant/open-assistant";

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

// jsdom has no matchMedia; tests flip `phoneWidth` to get the full-screen panel.
let phoneWidth = false;
function stubMatchMedia() {
  window.matchMedia = ((query: string) => ({
    matches: phoneWidth,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
}

beforeEach(() => {
  messages = [];
  sendMessage.mockClear();
  phoneWidth = false;
  stubMatchMedia();
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

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

  it("leaves the page usable beside the panel on desktop", async () => {
    const page = document.createElement("main");
    document.body.appendChild(page);

    await openAssistant();

    expect(page).not.toHaveAttribute("inert");
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "false");
    page.remove();
  });

  it("makes the page behind the full-screen panel inert on phones", async () => {
    phoneWidth = true;
    const page = document.createElement("main");
    document.body.appendChild(page);

    const user = await openAssistant();

    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    expect(page).toHaveAttribute("inert");

    await user.keyboard("{Escape}");

    expect(page).not.toHaveAttribute("inert");
    expect(
      screen.getByRole("button", { name: "Ask about Omer" })
    ).toHaveFocus();
    page.remove();
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

  it("opens when something else on the page asks it to", () => {
    render(<AssistantWidget />);

    act(() => openFromElsewhere());

    expect(
      screen.getByRole("dialog", { name: "Ask about Omer" })
    ).toBeInTheDocument();
  });
});

describe("AssistantWidget nudge", () => {
  const nudgeName = "Ask my AI assistant anything about me";

  function renderAndWait() {
    vi.useFakeTimers();
    render(<AssistantWidget />);
    act(() => vi.advanceTimersByTime(2500));
  }

  it("points Visitors at the Assistant after a short delay", () => {
    vi.useFakeTimers();
    render(<AssistantWidget />);
    expect(
      screen.queryByRole("button", { name: nudgeName })
    ).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(2500));

    expect(screen.getByRole("button", { name: nudgeName })).toBeInTheDocument();
  });

  it("opens the Assistant when clicked, and never shows again", () => {
    renderAndWait();

    fireEvent.click(screen.getByRole("button", { name: nudgeName }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: nudgeName })
    ).not.toBeInTheDocument();

    cleanup();
    renderAndWait();
    expect(
      screen.queryByRole("button", { name: nudgeName })
    ).not.toBeInTheDocument();
  });

  it("can be dismissed without opening the Assistant", () => {
    renderAndWait();

    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));

    expect(
      screen.queryByRole("button", { name: nudgeName })
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ask about Omer" })
    ).toHaveFocus();
  });

  it("never appears if the Assistant is opened before the delay", () => {
    vi.useFakeTimers();
    render(<AssistantWidget />);

    fireEvent.click(screen.getByRole("button", { name: "Ask about Omer" }));
    fireEvent.click(
      screen.getAllByRole("button", { name: "Close assistant" })[0]
    );
    act(() => vi.advanceTimersByTime(2500));

    expect(
      screen.queryByRole("button", { name: nudgeName })
    ).not.toBeInTheDocument();
  });
});
