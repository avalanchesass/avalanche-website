const fs = require(`fs`);
const Handlebars = require(`handlebars`);
const htmlclean = require(`htmlclean`);
const mkdir = require(`mkdirp`);
const path = require(`path`);

const handlebarsRegisterPartials = require(`./handlebars-register-partials.js`);

const viewsDirectory = path.join(process.cwd(), `resources`, `views`);
handlebarsRegisterPartials(Handlebars, viewsDirectory);

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
    console.log(error);
  }
};
