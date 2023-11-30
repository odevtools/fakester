const Image = require("@11ty/eleventy-img");
const path = require('path');

module.exports = function (eleventyConfig) {
	eleventyConfig.addShortcode("image", async function(src, alt, sizes) {
	    console.log(`Generating image(s) for: ${src}`)

	    let options = {
	      widths: [300, 600],
	      formats: ["avif", "jpeg"],
	      urlPath: 'static/images/',
	      outputDir: 'public/static/images/',
	      filenameFormat: function(id, src, width, format, options) {
	        const extension = path.extname(src)
	        const name = path.basename(src, extension)
	        return `${name}-${width}w.${format}`
	      }
	    };

	    let metadata = await Image(src, options);

	    let imageAttributes = {
	      alt,
	      sizes,
	      loading: "lazy",
	      decoding: "async",
	    };

	    // You bet we throw an error on a missing alt (alt="" works okay)
	    return Image.generateHTML(metadata, imageAttributes);
	  });
};