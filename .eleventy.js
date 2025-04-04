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

  // media collection
  eleventyConfig.addCollection("shelfItems", function (collection) {
    const allItems = collection.getFilteredByGlob([
      "src/games/Genshin/abyss/**/*.md",
      "src/games/ZZZ/shiyu/**/*.md",
    ]);

    // spiral abyss posts are special
    allItems.forEach((page) => {
      if (
        page.filePathStem.includes("/games/Genshin/abyss/") &&
        !page.filePathStem.endsWith("/abyss/index")
      ) {
        page.data.eleventyNavigation = {
          key: page.data.title || page.fileSlug,
          parent: "Abyss",
          parentKey: "Abyss",
        };
      }
    });

    const abyssIndex = collection
      .getAll()
      .find(
        (page) =>
          page.filePathStem.includes("/games/Genshin/abyss/index") ||
          page.filePathStem === "/games/Genshin/abyss",
      );

    if (abyssIndex) {
      abyssIndex.data.eleventyNavigation = {
        key: "Abyss",
        parent: "Genshin",
        parentKey: "Genshin",
      };
    }

    const genshinIndex = collection
      .getAll()
      .find(
        (page) =>
          page.filePathStem.includes("/games/Genshin/index") ||
          page.filePathStem === "/games/Genshin",
      );

    if (genshinIndex) {
      genshinIndex.data.eleventyNavigation = {
        key: "Genshin",
        parent: "Shelf",
        parentKey: "Shelf",
      };
    }

    // shiyu defense posts are special
    allItems.forEach((page) => {
      if (
        page.filePathStem.includes("/games/ZZZ/shiyu/") &&
        !page.filePathStem.endsWith("/shiyu/index")
      ) {
        page.data.eleventyNavigation = {
          key: page.data.title || page.fileSlug,
          parent: "Shiyu",
          parentKey: "Shiyu",
        };
      }
    });

    const shiyuIndex = collection
      .getAll()
      .find(
        (page) =>
          page.filePathStem.includes("/games/ZZZ/shiyu/index") ||
          page.filePathStem === "/games/ZZZ/shiyu",
      );

    if (shiyuIndex) {
      shiyuIndex.data.eleventyNavigation = {
        key: "Shiyu",
        parent: "ZZZ",
        parentKey: "ZZZ",
      };
    }

    const zzzIndex = collection
      .getAll()
      .find(
        (page) =>
          page.filePathStem.includes("/games/ZZZ/index") ||
          page.filePathStem === "/games/ZZZ",
      );

    if (zzzIndex) {
      zzzIndex.data.eleventyNavigation = {
        key: "ZZZ",
        parent: "Shelf",
        parentKey: "Shelf",
      };
    }

    return allItems;
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
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
    },
  };
};
