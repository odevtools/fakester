module.exports = function (eleventyConfig) {
  const dir = {
      input: 'src',
      output: 'public',
      includes: '_includes',
      layouts: '_layouts',
    };

  eleventyConfig.setBrowserSyncConfig({
    files: './public/static/**/*.(css|js)',
  });

  const watchTargets = ['src/static/js/*'];
  watchTargets.forEach(path => eleventyConfig.addWatchTarget(path));

  eleventyConfig.addPlugin(require('./config/shortcodes/rollup.js'));

  // find a way to share input and output dirs
  // https://github.com/11ty/eleventy-img/issues/9
  eleventyConfig.addPlugin(require('./config/shortcodes/image.js'));

  return {
    dir
  };
};