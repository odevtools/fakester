const rollupPlugin = require('eleventy-plugin-rollup');
const rollupTypescript = require('@rollup/plugin-typescript');
const rollupNodeResolve = require('@rollup/plugin-node-resolve');
const rollupCommonjs = require('@rollup/plugin-commonjs');

module.exports = function (eleventyConfig) {
   eleventyConfig.addPlugin(rollupPlugin, {
    rollupOptions: {
      plugins: [rollupTypescript(), rollupNodeResolve(), rollupCommonjs({
        // non-CommonJS modules will be ignored, but you can also
        // specifically include/exclude files
        include: [ "node_modules/**" ], // Default: undefined

        // if true then uses of `global` won't be dealt with by this plugin
        ignoreGlobal: false, // Default: false

        // if false then skip sourceMap generation for CommonJS modules
        sourceMap: false // Default: true
      })],
      output: {
        format: 'es',
        dir: 'public/static/js',
      },
    },
  });
};