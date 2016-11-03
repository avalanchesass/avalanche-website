const path = require(`path`);

const buildCss = require(`./_build-css.js`);

module.exports = (packageName) => {
  const packagePath = path.join(process.cwd(), `avalanche`, `packages`, packageName);
  const inputFile = path.join(packagePath, `test`, `test.scss`);
  const outputFile = path.join(process.cwd(), `dist`, `packages`, packageName, `css`, `index.css`);

  buildCss(inputFile, outputFile, { cwd: packagePath });
};
