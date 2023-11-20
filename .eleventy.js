module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksFilter("currentYear", function() {
    return new Date().getFullYear();
  });

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/styles");

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};