module.exports = {
  eleventyNavigation: data => {
	// Don't set navigation data if no title is present
	if (!data.title) return {};
	
	// Don't override if navigation is already set (like in posts.json)
	if (data.eleventyNavigation) {
	  return {
		key: data.title,
		...data.eleventyNavigation  // preserve existing navigation settings
	  };
	}
	
	// Default case for pages without specific navigation
	return {
	  key: data.title,
	  parent: "Home",
	  parentKey: "Home"
	};
  }
};