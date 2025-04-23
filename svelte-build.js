const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");
const path = require("path");

async function buildSvelte() {
  const result = await esbuild.build({
    entryPoints: ["src/svelte/main.js"], // Your Svelte app entry point
    bundle: true,
    outfile: "_site/assets/teashop.js", // Output to 11ty's build folder
    plugins: [sveltePlugin()],
    minify: true,
  });

  console.log("Svelte build complete");
}

buildSvelte().catch((e) => {
  console.error("Svelte build failed:", e);
  process.exit(1);
});
