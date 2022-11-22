import esbuild from "esbuild";

const result = await esbuild.build({
  entryPoints: ["src/index.tsx"],
  bundle: true,
  minify: true,
  outfile: "docs/index.global.js",
});
console.log("built", result);
