module.exports = {
  layout: "page.html",
  tags: "post",
  eleventyComputed: {
    permalink: function (data) {
      // Use the built-in slugify filter
      const slug = this.slug(data.title || this.page.fileSlug);
      return `/blog/${slug}/`;
    },
  },
};
