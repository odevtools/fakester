const rollupPlugin = require('eleventy-plugin-rollup');

module.exports = function (eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    files: './public/static/**/*.(css|js)',
  });

  eleventyConfig.addWatchTarget('src/static/js/*');

  eleventyConfig.addPlugin(rollupPlugin, {
    rollupOptions: {
      output: {
        format: 'es',
        dir: 'public/static/js',
      },
    },
  });

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};