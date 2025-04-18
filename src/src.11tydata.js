// credit to https://www.ovl.design/text/permalink-driven-breadcrumbs-in-eleventy/
// i spent so long trying to figure out how to do this before i found this blog post that solved all my problems

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

        // replace hyphens with spaces
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
