module.exports = (config) => {
  // set directories to pass through to the dist folder
  config.addPassthroughCopy("./src/images/");
  config.addPassthroughCopy("./src/favicon/");
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
