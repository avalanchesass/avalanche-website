const fs = require(`fs`);
const glob = require(`glob`);
const path = require(`path`);

const buildHtml = require(`./_build-html.js`);

const pages = glob.sync(path.join(process.cwd(), `pages`, `**`, `*.hbs`));

module.exports = (data) => {
  pages.forEach((page) => {
    const baseTemplate = fs.readFileSync(page, `utf8`);
    const pathName = path.parse(page).name;
    const subPath = path
      .parse(page.replace(path.join(process.cwd(), `pages`, path.sep), ``))
      .dir.split(path.sep);
    const outputPath = [process.cwd(), `dist`, ...subPath];

    if (pathName !== `index`) {
      outputPath.push(pathName);
    }

    const outputFile = path.join(...outputPath, `index.html`);
    buildHtml(baseTemplate, data, outputFile);
  });
};
