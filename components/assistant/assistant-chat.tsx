"use client";

import { useEffect, useRef, useState, type Ref } from "react";
import Link from "next/link";
import type { UseChatHelpers } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { ArrowClockwise, PaperPlaneRight } from "@phosphor-icons/react";
import { AssistantMessage } from "@/components/assistant/assistant-message";
import { MAX_QUESTION_LENGTH } from "@/lib/assistant/chat-request";
import { LOG_RETENTION_DAYS } from "@/lib/assistant/conversation-log-policy";

export const STARTER_QUESTIONS = [
  "What has Omer built?",
  "What's his tech stack?",
  "Tell me about Commit Pet",
  "Is Omer open to work?",
];

export function AssistantChat({
  chat,
  inputRef,
}: {
  chat: UseChatHelpers<UIMessage>;
  inputRef?: Ref<HTMLTextAreaElement>;
}) {
  const { messages, sendMessage, status, error, regenerate } = chat;
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const scroller = scrollRef.current;
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }, [messages, status]);

  function ask(question: string) {
    const text = question.trim();
    if (!text || busy) return;
    sendMessage({ text });
    setInput("");
  }

  return (
    <div className="flex h-full flex-col">
      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col justify-end gap-4">
            <div className="text-sm leading-relaxed text-muted-foreground">
              <p className="text-base font-medium text-foreground">
                Hey there 👋
              </p>
              <p className="mt-1">
                I&apos;m an AI that knows Omer&apos;s work inside out (well, the
                parts he told me about). Ask me anything about his projects,
                experience, or skills.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {STARTER_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => ask(question)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-[color,background-color,border-color,transform] duration-150 ease-[var(--ease-out-strong)] hover:border-foreground/30 hover:bg-muted hover:text-foreground active:scale-95"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <AssistantMessage key={message.id} message={message} />
          ))
        )}

        {status === "submitted" && (
          <div className="flex justify-start" aria-label="Assistant is typing">
            <div className="flex gap-1 rounded-2xl rounded-bl-md bg-muted px-3.5 py-3">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
                  style={{ animationDelay: `${dot * 120}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-sm">
            <span className="text-destructive">
              Something went wrong on my end.
            </span>
            <button
              type="button"
              onClick={() => regenerate()}
              className="flex shrink-0 items-center gap-1 font-medium text-foreground hover:underline"
            >
              <ArrowClockwise size={14} />
              Try again
            </button>
          </div>
        )}
      </div>

      <form
        className="border-t border-border/60 p-3"
        onSubmit={(event) => {
          event.preventDefault();
          ask(input);
        }}
      >
        <div className="flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2 transition-colors focus-within:border-foreground/30">
          <label htmlFor="assistant-question" className="sr-only">
            Your question
          </label>
          <textarea
            id="assistant-question"
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                ask(input);
              }
            }}
            maxLength={MAX_QUESTION_LENGTH}
            rows={1}
            placeholder="Ask about Omer…"
            className="max-h-28 min-h-6 flex-1 resize-none bg-transparent text-base leading-6 sm:text-sm outline-none [field-sizing:content] placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={busy || input.trim().length === 0}
            aria-label="Send question"
            className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] active:scale-90 disabled:opacity-30"
          >
            <PaperPlaneRight size={14} weight="fill" />
          </button>
        </div>
        <p className="mt-2 px-1 text-[0.7rem] leading-snug text-muted-foreground">
          Chats are saved for {`${LOG_RETENTION_DAYS} days`} to improve answers,
          so skip the personal details.{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Privacy
          </Link>
        </p>
      </form>
    </div>
  );
}
