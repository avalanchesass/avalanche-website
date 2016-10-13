const autoprefixer = require(`autoprefixer`);
const fs = require(`fs`);
const magicImporter = require(`node-sass-magic-importer`);
const mkdir = require(`mkdirp`);
const path = require(`path`);
const postcss = require(`postcss`);
const postcssScssSyntax = require(`postcss-scss`);
const sass = require(`node-sass`);

module.exports = (inputFile, outputFile) => {
  let css = sass.renderSync({
    file: inputFile,
    importer: magicImporter
  }).css.toString();
  css = postcss(autoprefixer).process(css, { syntax: postcssScssSyntax }).css;

  try {
    mkdir.sync(path.parse(outputFile).dir);
  } catch (error) {}
  fs.writeFileSync(outputFile, css);
};
