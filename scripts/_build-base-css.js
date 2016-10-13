const path = require(`path`);

const buildCss = require(`./_build-css.js`);

module.exports = () => {
  const inputFile = path.join(process.cwd(), `resources`, `scss`, `global.scss`);
  const outputFile = path.join(process.cwd(), `dist`, `base`, `css`, `global.css`);

  buildCss(inputFile, outputFile);
};
