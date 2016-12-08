const buildBaseCss = require(`./build/base-css.js`);
const buildBaseHtml = require(`./build/base-html.js`);
const buildPackageCss = require(`./build/package-css.js`);
const buildPackageHtml = require(`./build/package-html.js`);
const getDirectories = require(`./lib/get-directories.js`);

const excludedPackages = [`cli`];
const packages = getDirectories(`avalanche/packages`)
  .filter(packageName => !excludedPackages.includes(packageName));

const defaultData = {
  css: `<link rel="stylesheet" href="/base/css/global.css">`,
};

buildBaseHtml(defaultData);
buildBaseCss();

packages.forEach((packageName) => {
  const packageData = JSON.parse(JSON.stringify(defaultData));
  packageData.title = packageName;
  packageData.metaTitle = `${packageName} package | avalanche`;

  packageData.css = [
    `<link rel="stylesheet" href="/packages/${packageName}/css/index.css">`,
    `<link rel="stylesheet" href="/base/css/global.css">`,
  ].join(`\n`);

  buildPackageHtml(packageName, packageData);
  buildPackageCss(packageName);
});
