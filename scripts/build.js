const buildPackageHtml = require(`./_build-package-html.js`);
const buildPackageCss = require(`./_build-package-css.js`);
const getDirectories = require(`./_get-directories.js`);

const packages = getDirectories(`avalanche/packages`);

const data = {};

packages.forEach((packageName) => {
  data.title = packageName;
  data.css = `<link rel="stylesheet" href="css/index.css">`;
  data.scripts = ``;

  buildPackageHtml(packageName, data);
  buildPackageCss(packageName);
});
