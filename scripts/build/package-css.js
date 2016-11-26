const path = require(`path`);

const sass2css = require(`../lib/sass2css.js`);

module.exports = (packageName) => {
  const packagePath = path.join(process.cwd(), `avalanche`, `packages`, packageName);
  const inputFile = path.join(packagePath, `test`, `test.scss`);
  const outputFile = path.join(process.cwd(), `dist`, `packages`, packageName, `css`, `index.css`);

  sass2css(inputFile, outputFile, { cwd: packagePath });
};
