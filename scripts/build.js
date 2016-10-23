const buildBaseCss = require(`./_build-base-css.js`);
const buildBaseHtml = require(`./_build-base-html.js`);
const buildPackageCss = require(`./_build-package-css.js`);
const buildPackageHtml = require(`./_build-package-html.js`);
const getDirectories = require(`./_get-directories.js`);

const packages = getDirectories(`avalanche/packages`);

const data = {
  css: `<link rel="stylesheet" href="/base/css/global.css">`
};

buildBaseHtml(data);
buildBaseCss();

data.css += `<link rel="stylesheet" href="css/index.css">`;

packages.forEach((packageName) => {
  data.title = packageName;

  buildPackageHtml(packageName, data);
  // Disable temporary because of:
  // https://github.com/maoberlehner/node-sass-magic-importer/issues/68
  // buildPackageCss(packageName);
});
