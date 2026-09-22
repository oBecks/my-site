"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useChat } from "@ai-sdk/react";
import { ChatCircleDots, X } from "@phosphor-icons/react";
import { AssistantChat } from "@/components/assistant/assistant-chat";

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  // Lives here rather than in the panel so closing it keeps the Conversation.
  const chat = useChat();
  const reduceMotion = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function close() {
    setOpen(false);
    toggleRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="assistant-panel"
            role="dialog"
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
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={open ? "Close assistant" : "Ask about Omer"}
        aria-expanded={open}
        className="fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-150 ease-[var(--ease-out-strong)] hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6"
      >
        {open ? <X size={22} /> : <ChatCircleDots size={24} weight="fill" />}
      </button>
    </>
  );
}
