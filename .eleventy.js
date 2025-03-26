// filters
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const esbuild = require("esbuild");
const esbuildSvelte = require("esbuild-svelte");

module.exports = (eleventyConfig) => {
  // Add a callback to log navigation data during build
  eleventyConfig.on("eleventy.after", () => {
    console.log("Building navigation structure...");
  });

  // Add the navigation plugin with explicit config
  eleventyConfig.addPlugin(eleventyNavigationPlugin, {
    enableLiveReload: true,
  });

  // add filters
  eleventyConfig.addFilter("dateFilter", dateFilter);
  eleventyConfig.addFilter("w3DateFilter", w3DateFilter);
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  // set directories to pass through to the _site folder
  eleventyConfig.addPassthroughCopy("./src/favicon/");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy({ "./src/fonts/": "/fonts/" });
  //eleventyConfig.addPassthroughCopy("**/photos/*.jpg");
  //eleventyConfig.addPassthroughCopy("**/photos/*.jpeg");
  //eleventyConfig.addPassthroughCopy("**/photos/*.png");
  eleventyConfig.addPassthroughCopy("./src/icons/*.png");
  eleventyConfig.addPassthroughCopy("./src/icons/teacups/*.png");
  eleventyConfig.addPassthroughCopy("./src/icons/*.gif");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("_site/assets");

  // fix markdown links
  eleventyConfig.addTransform(
    "fixMarkdownLinks",
    function (content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        return content.replace(/href="([^"]+)\.md"/g, 'href="$1.html"');
      }
      return content;
    },
  );

  // fix smartquotes
  const markdownIt = require("markdown-it");
  let options = {
    html: true,
    typographer: true,
  };

  let markdownLibrary = markdownIt(options);
  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addCollection("navigationData", (collection) => {
    console.log("Navigation collection being built");
    return collection.getAll();
  });

  eleventyConfig.on("eleventy.before", async () => {
    console.log("Building Svelte app...");
    try {
      await esbuild.build({
        entryPoints: ["src/svelte/main.js"],
        bundle: true,
        outfile: "_site/assets/teashop.js",
        plugins: [
          esbuildSvelte({
            compilerOptions: {
              dev: process.env.NODE_ENV !== "production",
            },
          }),
        ],
        sourcemap: true,
        format: "iife", // Important! This makes it work in the browser
        logLevel: "info",
      });
      console.log("Svelte build complete");
    } catch (err) {
      console.error("Svelte build failed:", err);
    }
  });

  // Add watch target for Svelte files
  eleventyConfig.addWatchTarget("./src/svelte/");

  console.log("Eleventy configuration loaded");

  // Single return statement with all configuration
  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site", // Changed from "dist" to "_site" to match your setup
      data: "_data",
    },
  };
};
