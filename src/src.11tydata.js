module.exports = {
  eleventyComputed: {
    breadcrumb: function ({ permalink, title = "", hideBreadcrumb }) {
      if (!permalink || typeof permalink !== "string" || hideBreadcrumb) {
        return [];
      }

      const segments = permalink.replace(/^\/|\/$/g, "").split("/");
      const breadcrumb = [{ url: "/", name: "Home" }];

      let index = 1;
      let accumulatedPath = "";

      for (const segment of segments) {
        accumulatedPath += "/" + segment;

        // Replace hyphens with spaces
        const formattedName = segment.replace(/-/g, " ");

        breadcrumb.push({
          url: `${accumulatedPath}/`,
          name: formattedName,
        });

        index++;
      }

      return breadcrumb;
    },
  },
};
