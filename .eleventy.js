// filters
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");

module.exports = (eleventyConfig) => {
  // filters
  const dateFilter = require("./src/filters/date-filter.js");
  const w3DateFilter = require("./src/filters/w3-date-filter.js");

  // add filters
  eleventyConfig.addFilter("dateFilter", dateFilter);
  eleventyConfig.addFilter("w3DateFilter", w3DateFilter);
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  // set directories to pass through to the dist folder
  eleventyConfig.addPassthroughCopy("./src/favicon/");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy({ "./src/fonts/": "/fonts/" });
  eleventyConfig.addPassthroughCopy("**/photos/*.jpg");
  eleventyConfig.addPassthroughCopy("**/photos/*.jpeg");
  eleventyConfig.addPassthroughCopy("**/photos/*.png");
  eleventyConfig.addPassthroughCopy("./src/icons/*.png");
  eleventyConfig.addPassthroughCopy("./src/icons/*.gif");

  console.log("Eleventy configuration loaded");

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
      data: "_data", // Explicitly set the data directory
    },
  };
};
