const autoprefixer = require(`autoprefixer`);
const fs = require(`fs`);
const magicImporter = require(`node-sass-magic-importer`);
const mkdir = require(`mkdirp`);
const path = require(`path`);
const postcss = require(`postcss`);
const postcssScssSyntax = require(`postcss-scss`);
const sass = require(`node-sass`);

module.exports = (inputFile, outputFile) => {
  sass.render({
    file: inputFile,
    importer: magicImporter()
  }, (error, result) => {
    if (!error) {
      let css = result.css.toString();
      css = postcss(autoprefixer).process(css, { syntax: postcssScssSyntax }).css;

      try {
        mkdir.sync(path.parse(outputFile).dir);
      } catch (e) {}
      fs.writeFileSync(outputFile, css);
    } else {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  });
};
