"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useChat } from "@ai-sdk/react";
import { Robot, X } from "@phosphor-icons/react";
import { AssistantChat } from "@/components/assistant/assistant-chat";
import {
  AssistantNudge,
  hasSeenNudge,
  rememberNudgeSeen,
} from "@/components/assistant/assistant-nudge";
import { OPEN_ASSISTANT_EVENT } from "@/lib/assistant/open-assistant";

// Below Tailwind's `sm` breakpoint the panel covers the whole screen.
const FULL_SCREEN_QUERY = "(max-width: 639.98px)";

// Lets the hero finish animating in before the nudge draws the eye away.
const NUDGE_DELAY_MS = 2500;

function subscribeToFullScreen(onChange: () => void) {
  const query = window.matchMedia(FULL_SCREEN_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useFullScreenPanel() {
  return useSyncExternalStore(
    subscribeToFullScreen,
    () => window.matchMedia(FULL_SCREEN_QUERY).matches,
    () => false
  );
}

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState<"waiting" | "showing" | "retired">(
    "waiting"
  );
  // Lives here rather than in the panel so closing it keeps the Conversation.
  const chat = useChat();
  const reduceMotion = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const fullScreen = useFullScreenPanel();
  // Full screen, the panel is modal: nothing behind it can take focus.
  const modal = open && fullScreen;

  // Once the Visitor has found the Assistant, the nudge never comes back.
  function retireNudge() {
    setNudge("retired");
    rememberNudgeSeen();
  }

  function openPanel() {
    setOpen(true);
    retireNudge();
  }

  useEffect(() => {
    if (hasSeenNudge()) return;
    const timer = setTimeout(
      () => setNudge((state) => (state === "waiting" ? "showing" : state)),
      NUDGE_DELAY_MS
    );
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function onOpen() {
      setOpen(true);
      setNudge("retired");
      rememberNudgeSeen();
    }
    window.addEventListener(OPEN_ASSISTANT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_ASSISTANT_EVENT, onOpen);
  }, []);

  // flushSync so the toggle is no longer inert by the time it takes focus.
  function close() {
    flushSync(() => setOpen(false));
    toggleRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        flushSync(() => setOpen(false));
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Everything outside the widget, e.g. the header, main and footer. Next's
  // route announcer stays live so tapping a project link is still announced.
  useEffect(() => {
    const root = rootRef.current;
    if (!modal || !root) return;
    const background = Array.from(document.body.children).filter(
      (element) =>
        !element.contains(root) &&
        element.tagName !== "NEXT-ROUTE-ANNOUNCER" &&
        !element.hasAttribute("inert")
    );
    background.forEach((element) => element.setAttribute("inert", ""));
    return () =>
      background.forEach((element) => element.removeAttribute("inert"));
  }, [modal]);

  return (
    <div ref={rootRef} className="contents">
      <AnimatePresence>
        {nudge === "showing" && !open && (
          <AssistantNudge
            key="assistant-nudge"
            onOpen={openPanel}
            onDismiss={retireNudge}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="assistant-panel"
            role="dialog"
            aria-modal={modal}
            aria-label="Ask about Omer"
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }
            }
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-0 z-50 flex flex-col bg-background sm:inset-auto sm:right-6 sm:bottom-24 sm:h-[min(600px,calc(100dvh-11rem))] sm:w-[380px] sm:overflow-hidden sm:rounded-2xl sm:border sm:border-border sm:shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
              <div>
                <h2 className="text-sm font-medium">Ask about Omer</h2>
                <p className="text-xs text-muted-foreground">
                  AI assistant · can make mistakes
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close assistant"
                className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-[color,background-color,transform] duration-150 ease-[var(--ease-out-strong)] hover:bg-muted hover:text-foreground active:scale-90"
              >
                <X size={16} />
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <AssistantChat chat={chat} inputRef={inputRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={toggleRef}
        type="button"
        onClick={() => (open ? close() : openPanel())}
        aria-label={open ? "Close assistant" : "Ask about Omer"}
        aria-expanded={open}
        // Hidden under the full-screen panel, which has its own close button.
        inert={modal}
        data-nudging={nudge === "showing" && !open}
        className="nudge-wiggle fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-150 ease-[var(--ease-out-strong)] hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6"
      >
        {open ? <X size={22} /> : <Robot size={26} weight="duotone" />}
      </button>
    </div>
  );
}
