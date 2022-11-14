import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  outDir: "docs",
  splitting: true,
  sourcemap: false,
  minify: true,
});
