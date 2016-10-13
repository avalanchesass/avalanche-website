const fs = require(`fs`);
const Handlebars = require(`handlebars`);
const htmlclean = require(`htmlclean`);
const mkdir = require(`mkdirp`);
const path = require(`path`);

const layoutHbs = path.join(process.cwd(), `resources`, `views`, `layouts`, `main.hbs`);
Handlebars.registerPartial(`layouts/main`, fs.readFileSync(layoutHbs, `utf8`));

module.exports = (template, data, outputFile) => {
  let html = htmlclean(Handlebars.compile(template)(data));

  // Fix <pre> indentation.
  const pattern = html.match(/\s*\n[\t\s]*/);
  html = html.replace(new RegExp(pattern, `g`), `\n`);

  try {
    mkdir.sync(path.parse(outputFile).dir);
  } catch (error) {}
  fs.writeFileSync(outputFile, html);
};
