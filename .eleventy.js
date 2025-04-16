// filters
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const esbuild = require("esbuild");
const esbuildSvelte = require("esbuild-svelte");
const navigationHelper = require("./src/utils/navigationHelper.js");

module.exports = (eleventyConfig) => {
  // Add a callback to log navigation data during build
  eleventyConfig.on("eleventy.after", () => {
    console.log("Building navigation structure...");
  });

  // Add the navigation plugin with explicit config
  eleventyConfig.addPlugin(eleventyNavigationPlugin, {
    enableLiveReload: true,
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
  eleventyConfig.addPassthroughCopy("./src/favicon/");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy({ "./src/fonts/": "/fonts/" });
  eleventyConfig.addPassthroughCopy("./src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("./src/**/*.jpeg");
  eleventyConfig.addPassthroughCopy("./src/**/*.png");
  eleventyConfig.addPassthroughCopy("./src/icons/*.png");
  eleventyConfig.addPassthroughCopy("./src/icons/teacups/*.png");
  eleventyConfig.addPassthroughCopy("./src/icons/*.gif");
  eleventyConfig.addPassthroughCopy("src/assets");

  // media collection
  eleventyConfig.addCollection("shelfItems", function (collection) {
    const allItems = collection.getFilteredByGlob([
      "src/games/Genshin/abyss/**/*.md",
      "src/games/ZZZ/shiyu/**/*.md",
      "src/games/ZZZ/deadass/**/*.md",
      "src/games/playing/**/*.md",
      "src/games/shelved/**/*.md",
      "src/books/reading/**/*.md",
      "src/books/shelved/**/*.md",
      "src/watching/current/**/*.md",
      "src/watching/shelved/**/*.md",
      "src/games/playing/**/notes/*.md",
    ]);

    navigationHelper.setupShelfNavigation(collection);

    // Setup index pages
    navigationHelper.setupIndexNavigation(
      collection,
      "/games/Genshin/abyss",
      "Abyss",
      "Genshin",
    );
    navigationHelper.setupIndexNavigation(
      collection,
      "/games/Genshin",
      "Genshin",
      "Shelf",
    );
    navigationHelper.setupIndexNavigation(
      collection,
      "/games/ZZZ/shiyu",
      "Shiyu",
      "ZZZ",
    );
    navigationHelper.setupIndexNavigation(
      collection,
      "/games/ZZZ/deadass",
      "Deadly Assault",
      "ZZZ",
    );
    navigationHelper.setupIndexNavigation(
      collection,
      "/games/ZZZ",
      "ZZZ",
      "Shelf",
    );

    // Setup section indices
    ["games", "books", "watching"].forEach((section) => {
      navigationHelper.setupIndexNavigation(
        collection,
        `/${section}`,
        section.charAt(0).toUpperCase() + section.slice(1),
        "Shelf",
      );
    });

    allItems.forEach((page) => {
      // Try each navigation handler in turn
      page.data.eleventyNavigation =
        navigationHelper.handleNotesNavigation(page, collection) ||
        navigationHelper.handleAbyssNavigation(page) ||
        navigationHelper.handleShiyuNavigation(page) ||
        navigationHelper.handleDeadassNavigation(page) ||
        navigationHelper.handleShelfNavigation(page) ||
        page.data.eleventyNavigation;
    });

    return allItems;
  });

  // game screenshots collection
  eleventyConfig.addCollection("gamePhotos", function (collection) {
    let photosByGame = {};

    const fs = require("fs");
    const path = require("path");

    const gamePages = collection.getAll().filter((item) => {
      return (
        item.inputPath.includes("/games/") &&
        item.inputPath.endsWith("index.md")
      );
    });

    gamePages.forEach((game) => {
      const gameDirPath = game.inputPath.replace("/index.md", "");
      const gameId = gameDirPath.replace(/^.*\/src\/games\//, "");

      const photosDir = path.join(process.cwd(), gameDirPath, "photos");

      if (fs.existsSync(photosDir)) {
        try {
          const photoFiles = fs
            .readdirSync(photosDir)
            .filter(
              (file) =>
                file.endsWith(".jpg") ||
                file.endsWith(".png") ||
                file.endsWith(".jpeg") ||
                file.endsWith(".gif"),
            );

          const photos = photoFiles.map((filename) => {
            const photoUrl = `/games/${gameId}/photos/${filename}`;

            return {
              url: photoUrl,
              filename: filename,
              game: gameId,
            };
          });

          photos.sort((a, b) => b.filename.localeCompare(a.filename));

          photosByGame[gameId] = photos;
        } catch (err) {
          photosByGame[gameId] = [];
        }
      } else {
        photosByGame[gameId] = [];
      }
    });

    return photosByGame;
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
