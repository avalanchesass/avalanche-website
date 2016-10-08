const path = require(`path`);

const buildPackageHtml = require(path.join(__dirname, `_build-package-html.js`));
const buildPackageCss = require(path.join(__dirname, `_build-package-css.js`));
const getDirectories = require(path.join(__dirname, `_get-directories.js`));

const packages = getDirectories(`avalanche/packages`);

const data = {};

packages.forEach((packageName) => {
  data.title = packageName;
  data.css = `<link rel="stylesheet" href="css/index.css">`;
  data.scripts = ``;

  buildPackageHtml(packageName, data);
  buildPackageCss(packageName);
});
