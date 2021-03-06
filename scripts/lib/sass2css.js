const autoprefixer = require(`autoprefixer`);
const CleanCss = require(`clean-css`);
const magicImporter = require(`node-sass-magic-importer`);
const postcss = require(`postcss`);
const postcssScssSyntax = require(`postcss-scss`);
const sass = require(`node-sass`);

const writeFile = require(`./write-file.js`);

module.exports = (
  inputFile,
  outputFile,
  options = { cwd: process.cwd() },
  clean = false,
  includePaths = []
) => {
  sass.render({
    file: inputFile,
    importer: magicImporter(options),
    includePaths,
  }, (error, result) => {
    if (error) throw error;

    let css = result.css.toString();
    // eslint-disable-next-line prefer-destructuring
    css = postcss(autoprefixer).process(css, { syntax: postcssScssSyntax }).css;

    if (clean) {
      css = new CleanCss({
        level: 2,
      }).minify(css).styles;
    }

    writeFile(outputFile, css);
  });
};
