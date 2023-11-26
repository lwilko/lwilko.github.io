const path = require('path');
const image = require('@11ty/eleventy-img');

module.exports = function (eleventyConfig) {
  // Shortcode: eleventy-img image generation
  eleventyConfig.addNunjucksAsyncShortcode('image', async function (src, alt, sizes) {
    if (alt === undefined) {
      // Throw an error here if alt text is missing
      throw new Error(`Missing \`alt\` on "${alt}" from: ${src}`);
    }

    let metadata = await image(`src/assets/images/${src}`, {
      widths: [300, 600, 900],
      formats: ['jpeg', 'png', 'webp'],
      outputDir: 'dist/img/',
      filenameFormat: function (id, src, width, format) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}.${format}`;
      }, // Closing parenthesis was added here
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: 'lazy',
      decoding: 'async',
    };

    return image.generateHTML(metadata, imageAttributes);
  });

  // Passthrough copies
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/styles');
  eleventyConfig.addPassthroughCopy('src/js');

  // Input/output configs
  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};