const buildBaseCss = require(`./build/base-css.js`);
const buildBaseHtml = require(`./build/base-html.js`);
const buildPackageCss = require(`./build/package-css.js`);
const buildPackageHtml = require(`./build/package-html.js`);
const getDirectories = require(`./lib/get-directories.js`);

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
  buildPackageCss(packageName);
});
