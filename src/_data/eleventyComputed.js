module.exports = {
  eleventyNavigation: (data) => {
    // Don't set navigation data if no title is present
    if (!data.title) return {};

    // Don't override if navigation is already set
    if (data.eleventyNavigation) {
      return data.eleventyNavigation;
    }

    // Default case for pages without specific navigation
    return {
      key: data.title,
      parent: "Home",
    };
  },

  // Add parent info for breadcrumbs
  isSubpage: (data) => {
    if (!data.page || !data.page.filePathStem) return false;

    const pathParts = data.page.filePathStem.split("/");
    if (pathParts.length <= 4) return false; // Not a subpage

    // Check if this is in a subfolder of a media item
    if (
      pathParts[1] === "shelf" &&
      ["games", "books", "watching"].includes(pathParts[2]) &&
      pathParts.length > 4
    ) {
      return true;
    }

    return false;
  },

  // Parent URL for breadcrumbs
  parentUrl: (data) => {
    if (!data.page || !data.page.filePathStem) return "";

    const pathParts = data.page.filePathStem.split("/");
    if (pathParts.length <= 4) return ""; // Not a subpage

    // For media subpages, construct parent URL
    if (
      pathParts[1] === "shelf" &&
      ["games", "books", "watching"].includes(pathParts[2]) &&
      pathParts.length > 4
    ) {
      const category = pathParts[2];
      const mediaTitle = pathParts[3].toLowerCase().replace(/\s+/g, "-");
      return `/shelf/${category}/${mediaTitle}/`;
    }

    return "";
  },

  // Parent title for breadcrumbs
  parentTitle: (data) => {
    if (!data.page || !data.page.filePathStem) return "";

    const pathParts = data.page.filePathStem.split("/");
    if (pathParts.length <= 4) return ""; // Not a subpage

    // For media subpages, use media title
    if (
      pathParts[1] === "shelf" &&
      ["games", "books", "watching"].includes(pathParts[2]) &&
      pathParts.length > 4
    ) {
      // Use actual title if we can find it, otherwise use path
      return pathParts[3];
    }

    return "";
  },

  // Generate permalinks with hyphens
  permalink: (data) => {
    // Skip if permalink is already set
    if (data.permalink) return data.permalink;

    // Skip if it's not a content file
    if (!data.page || !data.page.filePathStem) return undefined;

    const pathParts = data.page.filePathStem.split("/");

    // For shelf content, ensure hyphens in permalinks
    if (pathParts[1] === "shelf") {
      let modifiedPath = "";

      for (let i = 1; i < pathParts.length; i++) {
        // Skip 'index'
        if (pathParts[i] === "index") continue;

        // Add hyphenated part
        if (pathParts[i]) {
          const slugified = pathParts[i].toLowerCase().replace(/\s+/g, "-");
          modifiedPath += "/" + slugified;
        }
      }

      // Add trailing slash for directories
      if (
        data.page.fileSlug === "index" ||
        pathParts[pathParts.length - 1] === "index"
      ) {
        modifiedPath += "/";
      }

      return modifiedPath;
    }

    // Keep the original permalink for non-shelf content
    return undefined;
  },
};
