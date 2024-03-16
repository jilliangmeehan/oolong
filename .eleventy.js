// filters
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");

module.exports = (config) => {
  // add filters
  config.addFilter("dateFilter", dateFilter);
  config.addFilter("w3DateFilter", w3DateFilter);

  // set directories to pass through to the dist folder
  config.addPassthroughCopy({ "./src/base.css": "base.css" });
  config.addPassthroughCopy("./src/favicon/");
  config.addPassthroughCopy({ "./src/fonts/": "/fonts/" });
  config.addPassthroughCopy("**/photos/*.jpg");
  config.addPassthroughCopy("**/photos/*.png");
  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
