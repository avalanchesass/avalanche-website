const sass = require('node-sass');
const magicImporter = require('node-sass-magic-importer');
const path = require('path');
const postcss  = require('postcss');
const postcssScssSyntax  = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const mkdir = require('mkdirp');

module.exports = (packageName) => {
  const distCssPath = path.join(process.cwd(), `dist`, `packages`, packageName, `css`);
  const packagePath = path.join(process.cwd(), `avalanche`, `packages`, packageName);
  const scssFile = path.join(packagePath, 'scss', 'index.scss');

  let css = sass.renderSync({
    file: scssFile
  }).css.toString();
  css = postcss(autoprefixer).process(css, { syntax: postcssScssSyntax }).css;

  try {
    mkdir.sync(distCssPath);
  } catch (error) {}
  fs.writeFileSync(path.join(distCssPath, 'index.css'), css);
};
