// filters
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const esbuild = require("esbuild");
const esbuildSvelte = require("esbuild-svelte");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

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

  // match filter
  eleventyConfig.addFilter("match", function (content, regex) {
    if (!content) return null;
    const matches = content.match(new RegExp(regex));
    return matches;
  });

  // get first image on a page to use as opengraph image
  eleventyConfig.addFilter("getFirstImagePath", function (content) {
    if (!content) return null;

    const imgMatch = content.match('<p><img[^>]*src="([^"]+)"[^>]*>');
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }

    return null;
  });

  // filter by tag
  eleventyConfig.addFilter("filterByTag", function (collection, tag) {
    if (!collection || !tag) return [];
    return collection.filter((item) => {
      return item.data.tags && item.data.tags.includes(tag);
    });
  });

  // set directories to pass through to the _site folder
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy({ "./src/fonts/": "/fonts/" });
  eleventyConfig.addPassthroughCopy({ "./src/favicon/": "/favicon/" });
  eleventyConfig.addPassthroughCopy({ "./src/icons/": "/icons/" });
  eleventyConfig.addPassthroughCopy({ "./src/images/": "/images/" });
  eleventyConfig.addPassthroughCopy("src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/**/*.jpeg");
  eleventyConfig.addPassthroughCopy("src/**/*.png");
  eleventyConfig.addPassthroughCopy("src/**/*.gif");

  // transform to make sure my image files end up in the right folders
  eleventyConfig.on("afterBuild", () => {
    const fs = require("fs");
    const path = require("path");
    const glob = require("glob");

    const slugify = (text) => {
      return text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
    };

    // handle blog images
    const blogImageFiles = glob.sync(
      "_site/posts/**/photos/**/*.{jpg,jpeg,png,gif}",
    );

    blogImageFiles.forEach((oldPath) => {
      const pathParts = oldPath.split(path.sep);
      const photosIndex = pathParts.indexOf("photos");
      const postNameIndex = photosIndex - 1;
      const postName = pathParts[postNameIndex];
      const slugifiedPostName = slugify(postName);

      const newPath = oldPath.replace(
        /\_site\/posts\/.*?\/photos\//,
        `_site/blog/${slugifiedPostName}/photos/`,
      );

      if (oldPath !== newPath) {
        const dir = path.dirname(newPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.renameSync(oldPath, newPath);
        console.log(`Moved blog image from ${oldPath} to ${newPath}`);
      }
    });

    // handle shelf images
    const shelfImageFiles = glob.sync(
      "_site/shelf/**/photos/**/*.{jpg,jpeg,png,gif}",
    );

    shelfImageFiles.forEach((oldPath) => {
      const newPath = oldPath
        .split(path.sep)
        .map((part) => {
          if (part.includes(".")) return part; // Don't modify filenames
          return slugify(part); // Use the same slugify function
        })
        .join(path.sep);

      if (oldPath !== newPath) {
        const dir = path.dirname(newPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.renameSync(oldPath, newPath);
        console.log(`Moved shelf image from ${oldPath} to ${newPath}`);
      }
    });

    // clean up empty directories
    function removeEmptyDirectories(directory) {
      const fs = require("fs");
      const path = require("path");

      if (!fs.existsSync(directory)) return;

      const files = fs.readdirSync(directory);

      if (files.length > 0) {
        files.forEach((file) => {
          const fullPath = path.join(directory, file);
          if (fs.statSync(fullPath).isDirectory()) {
            removeEmptyDirectories(fullPath);
          }
        });

        // check again after processing subdirectories
        if (fs.readdirSync(directory).length === 0) {
          fs.rmdirSync(directory);
        }
      } else {
        fs.rmdirSync(directory);
      }
    }

    removeEmptyDirectories("_site/posts");
    removeEmptyDirectories("_site/shelf");
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

  // markdown-it plugins
  const markdownIt = require("markdown-it");
  // footnotes
  const markdownItFootnote = require("markdown-it-footnote");
  // obsidian callouts
  const markdownItCallouts = require("markdown-it-obsidian-callouts");
  // fix smartquotes
  let options = {
    html: true,
    typographer: true,
  };

  let markdownLibrary = markdownIt(options);
  eleventyConfig.setLibrary("md", markdownLibrary);
  eleventyConfig.amendLibrary("md", (markdownLibrary) =>
    markdownLibrary.use(markdownItFootnote),
  );
  eleventyConfig.amendLibrary("md", (markdownLibrary) =>
    markdownLibrary.use(markdownItCallouts),
  );

  // customizes footnote rendering to remove brackets
  eleventyConfig.amendLibrary("md", (markdownLibrary) => {
    const defaultRender = markdownLibrary.renderer.rules.footnote_ref;
    markdownLibrary.renderer.rules.footnote_ref = (
      tokens,
      idx,
      options,
      env,
      self,
    ) => {
      return defaultRender(tokens, idx, options, env, self).replace(
        /\[(\d+)\]/g,
        "$1",
      );
    };
  });

  // rss feed
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: {
      name: "post", // `collections.post`
      limit: 0, // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "jillian g. meehan",
      subtitle: "sporadically updated blog",
      base: "https://jillian.garden/blog/",
      author: {
        name: "jillian g. meehan",
      },
    },
  });

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
