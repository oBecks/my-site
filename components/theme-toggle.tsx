"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@phosphor-icons/react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Avoids a hydration mismatch: the server doesn't know the client's theme.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-transform duration-150 ease-[var(--ease-out-strong)] hover:text-foreground active:scale-90"
    >
      <Sun
        size={17}
        weight="regular"
        className="theme-icon absolute transition-[opacity,transform] duration-300 ease-[var(--ease-in-out-strong)]"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark
            ? "rotate(0deg) scale(1)"
            : "rotate(-90deg) scale(0.5)",
        }}
      />
      <Moon
        size={17}
        weight="regular"
        className="theme-icon absolute transition-[opacity,transform] duration-300 ease-[var(--ease-in-out-strong)]"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark
            ? "rotate(90deg) scale(0.5)"
            : "rotate(0deg) scale(1)",
        }}
      />
    </button>
  );
}
