"use client";

import { ArrowRight, Sparkle } from "@phosphor-icons/react";
import { openAssistant } from "@/lib/assistant/open-assistant";

export function AskAssistantLink() {
  return (
    <button
      type="button"
      onClick={openAssistant}
      className="group mt-5 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
    >
      <Sparkle size={14} weight="fill" />
      Or ask my AI assistant anything about me
      <ArrowRight
        size={14}
        className="transition-transform duration-150 ease-[var(--ease-out-strong)] group-hover:translate-x-0.5"
      />
    </button>
  );
}
