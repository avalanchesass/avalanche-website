const CleanCss = require(`clean-css`);
const fs = require(`fs`);
const glob = require(`glob`);
const mkdir = require(`mkdirp`);
const path = require(`path`);
const uncss = require(`uncss`);

const filenameMatcher = /^ filename: (.*?) \*\*\*\/\n/;

uncss(glob.sync(path.join(`dist`, `**`, `*.html`)), { htmlroot: `dist` }, (error, output) => {
  if (error) throw error;

  output.split(`/*** uncss>`)
    .filter((x) => x.length)
    .forEach((x) => {
      const outputFile = x.match(filenameMatcher)[1].replace(`.css`, `.min.css`);
      const css = x.replace(filenameMatcher, ``);
      const minifiedCss = new CleanCss().minify(css).styles;

      mkdir(path.parse(outputFile).dir);
      fs.writeFileSync(outputFile, minifiedCss);
    });
});
