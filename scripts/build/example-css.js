const path = require(`path`);

const sass2css = require(`../lib/sass2css.js`);

module.exports = (exampleName) => {
  const examplePath = path.join(process.cwd(), `examples`, exampleName);
  const inputFile = path.join(examplePath, `scss`, `index.scss`);
  const outputFile = path.join(examplePath, `dist`, `index.css`);

  sass2css(inputFile, outputFile, { cwd: process.cwd() }, true);
};
