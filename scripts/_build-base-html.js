const fs = require(`fs`);
const glob = require(`glob`);
const path = require(`path`);

const buildHtml = require(`./_build-html.js`);

const pages = glob.sync(path.join(process.cwd(), `pages`, `**`, `*.hbs`));

module.exports = (data) => {
  pages.forEach((page) => {
    const baseTemplate = fs.readFileSync(page, `utf8`);
    const outputFile = path.join(process.cwd(), `dist`, `${path.parse(page).name}.html`);
    buildHtml(baseTemplate, data, outputFile);
  });
};
