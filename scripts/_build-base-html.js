const fs = require(`fs`);
const path = require(`path`);

const buildHtml = require(`./_build-html.js`);

const baseHbs = path.join(process.cwd(), `resources`, `views`, `index.hbs`);
const baseTemplate = fs.readFileSync(baseHbs, `utf8`);

module.exports = (data) => {
  const outputFile = path.join(process.cwd(), `dist`, `index.html`);

  buildHtml(baseTemplate, data, outputFile);
};
