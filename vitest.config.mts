import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    // Component tests opt into jsdom with a `@vitest-environment jsdom` comment.
    environment: "node",
    setupFiles: ["./vitest.setup.ts"],
  },
});
