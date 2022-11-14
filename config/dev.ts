import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  outDir: "watch",
  format: "iife",
  splitting: false,
  sourcemap: "inline",
  watch: true,
});
