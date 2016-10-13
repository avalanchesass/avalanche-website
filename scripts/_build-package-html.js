const fs = require(`fs`);
const marked = require(`marked`);
const path = require(`path`);

const buildHtml = require(`./_build-html.js`);

const packageHbs = path.join(process.cwd(), `resources`, `views`, `package.hbs`);
const packageTemplate = fs.readFileSync(packageHbs, `utf8`);

module.exports = (packageName, data) => {
  const outputFile = path.join(process.cwd(), `dist`, `packages`, packageName, `index.html`);
  const packagePath = path.join(process.cwd(), `avalanche`, `packages`, packageName);
  const packageContent = fs.readFileSync(path.join(packagePath, `README.md`), `utf8`);

  // Create live demo code from code example.
  const matchExamples = new RegExp(`\`\`\`html((.|\n)*?)\`\`\``, `g`);
  data.packageContent = marked(
    packageContent.replace(matchExamples, `$1\`\`\`html$1\`\`\``)
  );

  buildHtml(packageTemplate, data, outputFile);
};
