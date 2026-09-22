import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import type { UIMessage } from "ai";
import { cn } from "@/lib/utils";

const markdownComponents: Components = {
  p: ({ children }) => <p className="[&:not(:last-child)]:mb-2">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-2 list-disc space-y-1 pl-4 last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-2 list-decimal space-y-1 pl-4 last:mb-0">{children}</ol>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">
      {children}
    </code>
  ),
  a: ({ href = "", children }) => {
    const className =
      "font-medium text-foreground underline decoration-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground";
    // Project pages stay in the tab so the Conversation stays open beside them.
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  },
};

export function AssistantMessage({ message }: { message: UIMessage }) {
  const text = message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("");
  const fromVisitor = message.role === "user";

  return (
    <div className={cn("flex", fromVisitor ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed break-words",
          fromVisitor
            ? "rounded-br-md bg-primary whitespace-pre-wrap text-primary-foreground"
            : "rounded-bl-md bg-muted text-foreground/90"
        )}
      >
        {fromVisitor ? (
          text
        ) : (
          <ReactMarkdown components={markdownComponents}>{text}</ReactMarkdown>
        )}
      </div>
    </div>
  );
}
