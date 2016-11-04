const fs = require(`fs`);
const Handlebars = require(`handlebars`);
const htmlclean = require(`htmlclean`);
const mkdir = require(`mkdirp`);
const path = require(`path`);

const layoutHbs = path.join(process.cwd(), `resources`, `views`, `layouts`, `main.hbs`);
Handlebars.registerPartial(`layouts/main`, fs.readFileSync(layoutHbs, `utf8`));

const headerHbs = path.join(process.cwd(), `resources`, `views`, `partials`, `header.hbs`);
Handlebars.registerPartial(`partials/header`, fs.readFileSync(headerHbs, `utf8`));

const footerHbs = path.join(process.cwd(), `resources`, `views`, `partials`, `footer.hbs`);
Handlebars.registerPartial(`partials/footer`, fs.readFileSync(footerHbs, `utf8`));

module.exports = (template, data, outputFile) => {
  let html = htmlclean(Handlebars.compile(template)(data));

  // Fix <pre> indentation.
  const pattern = html.match(/\s*\n[\t\s]*/);
  html = html.replace(new RegExp(pattern, `g`), `\n`);

  try {
    mkdir.sync(path.parse(outputFile).dir);
    fs.writeFileSync(outputFile, html);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
