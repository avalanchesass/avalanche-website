const fs = require(`fs`);
const glob = require(`glob`);
const Handlebars = require(`handlebars`);
const htmlclean = require(`htmlclean`);
const mkdir = require(`mkdirp`);
const path = require(`path`);

const viewsDirectory = path.join(process.cwd(), `resources`, `views`);
const views = glob.sync(path.join(viewsDirectory, `**`, `*.hbs`));

views.forEach((view) => {
  const partialName = view.replace(`${viewsDirectory}/`, ``).replace(`.hbs`, ``);
  Handlebars.registerPartial(partialName, fs.readFileSync(view, `utf8`));
});

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
