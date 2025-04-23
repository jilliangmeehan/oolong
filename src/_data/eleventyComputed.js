module.exports = {
  // generate permalinks with hyphens
  permalink: (data) => {
    // skip if permalink is already set
    if (data.permalink) return data.permalink;

    // skip if it's not a content file
    if (!data.page || !data.page.filePathStem) return undefined;

    const pathParts = data.page.filePathStem.split("/");

    // shelf stuff
    if (pathParts[1] === "shelf") {
      let modifiedPath = "";

      for (let i = 1; i < pathParts.length; i++) {
        // skip 'index'
        if (pathParts[i] === "index") continue;

        // add hyphenated part
        if (pathParts[i]) {
          const slugified = pathParts[i].toLowerCase().replace(/\s+/g, "-");
          modifiedPath += "/" + slugified;
        }
      }

      // add trailing slash for directories
      if (
        data.page.fileSlug === "index" ||
        pathParts[pathParts.length - 1] === "index"
      ) {
        modifiedPath += "/";
      }

      return modifiedPath;
    }

    // keep the original permalink for other stuff
    return undefined;
  },
};
