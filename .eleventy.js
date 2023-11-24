const image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
    eleventyConfig.addNunjucksAsyncShortcode("image", async function (src, alt, sizes) {
        if (alt === undefined) {
            // You can throw an error here if alt is missing.
            throw new Error(`Missing \`alt\` on myimage from: ${src}`);
        }

        let metadata = await image(`src/${src}`, {
            widths: [300, 600, 900],
            formats: ["jpeg", "png", "webp"], // Include "png" in the formats array
            outputDir: "dist/assets/images/", // Adjusted output directory
        });

        let imageAttributes = {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async",
        };

        // You need to check and choose the correct format and size here.
        return image.generateHTML(metadata, imageAttributes);
    });

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/styles");
    eleventyConfig.addPassthroughCopy("src/js");

    return {
        dir: {
            input: "src",
            output: "dist"
        }
    };
};