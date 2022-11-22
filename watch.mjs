import esbuild from "esbuild";

const result = await esbuild.build({
  entryPoints: ["src/index.tsx"],
  bundle: true,
  watch: true,
  outfile: "watch/index.global.js",
});
console.log("watching...", result);
