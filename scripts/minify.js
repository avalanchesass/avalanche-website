const fs = require(`fs`);
const glob = require(`glob`);
const path = require(`path`);

const minifyCss = require(`./lib/minify-css.js`);
const version = require(`../package.json`).version;

minifyCss(() =>
  glob.sync(path.join(`dist`, `**`, `*.html`)).forEach((file) => {
    let contents = fs.readFileSync(file, { encoding: `utf8` });
    contents = contents.replace(/\.css">/g, `.${version}.min.css">`);
    contents = contents.replace(/\.js">/g, `.${version}.min.js">`);
    fs.writeFileSync(file, contents);
  })
);
