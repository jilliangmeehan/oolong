function handleAbyssNavigation(page) {
  if (
    page.filePathStem.includes("/games/Genshin/abyss/") &&
    !page.filePathStem.endsWith("/abyss/index")
  ) {
    return {
      key: page.data.title || page.fileSlug,
      parent: "Abyss",
      parentKey: "Abyss",
    };
  }
  return null;
}

function handleShiyuNavigation(page) {
  if (
    page.filePathStem.includes("/games/ZZZ/shiyu/") &&
    !page.filePathStem.endsWith("/shiyu/index")
  ) {
    return {
      key: page.data.title || page.fileSlug,
      parent: "Shiyu",
      parentKey: "Shiyu",
    };
  }
  return null;
}

function handleShelfNavigation(page) {
  const pathParts = page.filePathStem.split("/");
  if (page.fileSlug === "index") return null;

  if (page.url.startsWith("/shelf/")) {
    return {
      key: page.data.title || page.fileSlug,
      parent: "Shelf",
      parentKey: "Shelf",
    };
  }

  const section = pathParts[2];
  const shelfType = pathParts[3];

  if (
    ["games", "books", "watching"].includes(section) &&
    ["playing", "shelved", "reading"].includes(shelfType)
  ) {
    return {
      key: page.data.title || page.fileSlug,
      parent: "Shelf",
      parentKey: "Shelf",
    };
  }
  return null;
}

function setupShelfNavigation(collection) {
  const shelfIndex = collection
    .getAll()
    .find(
      (page) =>
        page.filePathStem === "/shelf" || page.filePathStem === "/shelf/index",
    );

  if (shelfIndex) {
    shelfIndex.data.eleventyNavigation = {
      key: "Shelf",
    };
  }
}

function setupIndexNavigation(collection, path, key, parent) {
  const index = collection
    .getAll()
    .find(
      (page) =>
        page.filePathStem.includes(path + "/index") ||
        page.filePathStem === path,
    );

  if (index) {
    index.data.eleventyNavigation = {
      key: key,
      parent: parent,
      parentKey: parent,
    };
  }
  return index;
}

module.exports = {
  handleAbyssNavigation,
  handleShiyuNavigation,
  handleShelfNavigation,
  setupIndexNavigation,
  setupShelfNavigation,
};
