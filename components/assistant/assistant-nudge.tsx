"use client";

import { motion, useReducedMotion } from "motion/react";
import { X } from "@phosphor-icons/react";

const SEEN_KEY = "assistant-nudge-seen";

// Storage can be missing or throw (private windows, blocked site data); the
// worst case is the nudge showing again, which is fine.
export function hasSeenNudge() {
  try {
    return window.localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function rememberNudgeSeen() {
  try {
    window.localStorage.setItem(SEEN_KEY, "1");
  } catch {}
}

type AssistantNudgeProps = {
  onOpen: () => void;
  onDismiss: () => void;
};

// A hand-written note with a drawn arrow pointing at the Assistant's toggle,
// shown once per Visitor so they know the bubble is there to be asked.
export function AssistantNudge({ onOpen, onDismiss }: AssistantNudgeProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      className="fixed right-5 bottom-[4.75rem] z-40 flex flex-col items-end sm:right-[5.5rem] sm:bottom-[3.25rem]"
    >
      <div className="flex -rotate-3 items-start gap-0.5 rounded-lg border border-border bg-background py-1 pr-1 pl-2.5 shadow-md shadow-black/10">
        <button
          type="button"
          onClick={onOpen}
          aria-label="Ask my AI assistant anything about me"
          className="text-right font-hand text-xl leading-5 text-foreground/85 transition-[color,transform] duration-150 ease-[var(--ease-out-strong)] hover:text-foreground active:scale-[0.97] sm:text-2xl sm:leading-6"
        >
          <span className="sm:hidden">ask my AI</span>
          <span className="hidden sm:inline">
            psst, ask my AI
            <br />
            anything about me
          </span>
        </button>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="flex size-5 items-center justify-center rounded-full text-muted-foreground/70 transition-[color,background-color,transform] duration-150 ease-[var(--ease-out-strong)] hover:bg-muted hover:text-foreground active:scale-90"
        >
          <X size={12} />
        </button>
      </div>

      <svg
        aria-hidden
        viewBox="0 0 40 36"
        fill="none"
        className="nudge-arrow mr-5 h-9 w-10 text-foreground/75 sm:hidden"
      >
        <path pathLength={1} d="M6 3 C 4 14, 10 24, 24 30" />
        <path pathLength={1} d="M15 31 L 25 31 L 21 22" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 84 44"
        fill="none"
        className="nudge-arrow -mr-2 hidden h-11 w-[5.25rem] text-foreground/75 sm:block"
      >
        <path
          pathLength={1}
          d="M10 3 C 6 18, 18 34, 44 36 C 58 37, 68 33, 76 27"
        />
        <path pathLength={1} d="M66 25 L 77 26 L 72 36" />
      </svg>
    </motion.div>
  );
}
