const buildBaseCss = require(`./build/base-css.js`);
const buildBaseHtml = require(`./build/base-html.js`);
const buildPackageCss = require(`./build/package-css.js`);
const buildPackageHtml = require(`./build/package-html.js`);
const getDirectories = require(`./lib/get-directories.js`);

const packages = getDirectories(`avalanche/packages`);

const defaultData = {
  css: `<link rel="stylesheet" href="/base/css/global.css">`
};

buildBaseHtml(defaultData);
buildBaseCss();

packages.forEach((packageName) => {
  const packageData = JSON.parse(JSON.stringify(defaultData));
  packageData.title = packageName;

  packageData.css = [
    `<link rel="stylesheet" href="/base/css/global.css">`,
    `<link rel="stylesheet" href="/packages/${packageName}/css/index.css">`
  ].join(`\n`);

  buildPackageHtml(packageName, packageData);
  buildPackageCss(packageName);
});
