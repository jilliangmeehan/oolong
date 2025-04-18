// filters
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const esbuild = require("esbuild");
const esbuildSvelte = require("esbuild-svelte");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addCollection("debug", function (collectionApi) {
    console.log(
      "All pages:",
      collectionApi.getAll().map((item) => item.url),
    );
    return collectionApi.getAll();
  });

  eleventyConfig.configureErrorReporting({ allowMissingExtensions: true });

  // add filters
  eleventyConfig.addFilter("dateFilter", dateFilter);
  eleventyConfig.addFilter("w3DateFilter", w3DateFilter);
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  //slugify filter
  eleventyConfig.addFilter("slugify", function (input) {
    if (!input) return "";
    return String(input)
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  });

  // set directories to pass through to the _site folder
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy({ "./src/fonts/": "/fonts/" });
  eleventyConfig.addPassthroughCopy({ "./src/favicon/": "/favicon/" });
  eleventyConfig.addPassthroughCopy("**/*.jpg");
  eleventyConfig.addPassthroughCopy("**/*.jpeg");
  eleventyConfig.addPassthroughCopy("**/*.png");
  eleventyConfig.addPassthroughCopy("**/*.gif");

  // transform to make sure my image files end up in the right folders
  eleventyConfig.on("afterBuild", () => {
    const fs = require("fs");
    const path = require("path");
    const glob = require("glob");

    // find all image files in _site
    const imageFiles = glob.sync("_site/**/*.{jpg,jpeg,png,gif}");

    imageFiles.forEach((oldPath) => {
      // create new slugified path
      const newPath = oldPath
        .split(path.sep)
        .map((part) => {
          if (part.includes(".")) return part; // Don't modify filenames
          return part.replace(/\s+/g, "-");
        })
        .join(path.sep);

      // only move if paths are different
      if (oldPath !== newPath) {
        // create directory if it doesn't exist
        const dir = path.dirname(newPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        // move file to new location
        fs.renameSync(oldPath, newPath);

        console.log(`Moved ${oldPath} to ${newPath}`);
      }
    });
  });

  // game collection
  eleventyConfig.addCollection("game", function (collection) {
    return collection.getFilteredByGlob("src/shelf/games/*/index.md");
  });

  // book collection
  eleventyConfig.addCollection("book", function (collection) {
    return collection.getFilteredByGlob("src/shelf/books/*/index.md");
  });

  // watching collection
  eleventyConfig.addCollection("watching", function (collection) {
    return collection.getFilteredByGlob("src/shelf/watching/*/index.md");
  });

  // tv collection
  eleventyConfig.addCollection("tv", function (collection) {
    return collection
      .getFilteredByGlob("src/shelf/watching/*/index.md")
      .filter((page) => page.data.type === "tv");
  });

  // movie collection
  eleventyConfig.addCollection("movie", function (collection) {
    return collection
      .getFilteredByGlob("src/shelf/watching/*/index.md")
      .filter((page) => page.data.type === "movie");
  });

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

  // teashop stuff
  eleventyConfig.on("eleventy.before", async () => {
    console.log("Building Teashop...");
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
        format: "iife",
        logLevel: "info",
      });
      console.log("Svelte build complete");
    } catch (err) {
      console.error("Svelte build failed:", err);
    }
  });

  eleventyConfig.addWatchTarget("./src/svelte/");

  console.log("Eleventy configuration loaded");

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: "/",
    htmlOutputSuffix: ".html",
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
    },
  };
};
