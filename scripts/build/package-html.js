const fs = require(`fs`);
const highlightJs = require(`highlight.js`);
const marked = require(`marked`);
const path = require(`path`);

const hbs2html = require(`../lib/hbs2html.js`);

marked.setOptions({
  highlight: (code, language) => {
    if (language) {
      return highlightJs.highlight(language, code).value;
    }
    return highlightJs.highlightAuto(code).value;
  },
});

const packageHbs = path.join(process.cwd(), `resources`, `views`, `package.hbs`);
const packageTemplate = fs.readFileSync(packageHbs, `utf8`);

module.exports = (packageName, data) => {
  const outputFile = path.join(process.cwd(), `dist`, `packages`, packageName, `index.html`);
  const packagePath = path.join(process.cwd(), `avalanche`, `packages`, packageName);
  const packageContent = fs.readFileSync(path.join(packagePath, `README.md`), `utf8`);

  // Create live demo code from code example.
  const matchExamples = new RegExp(`\`\`\`html((.|\n)*?)\`\`\``, `g`);
  // eslint-disable-next-line no-param-reassign
  data.packageContent = marked(packageContent.replace(
    matchExamples,
    `XDIVclass=c-demoX\r\nXDIVclass=c-demo__viewX\r\n$1/XDIVX\r\n\`\`\`html$1\`\`\`\r\n/XDIVX`
  )).replace(new RegExp(`<pre>`, `g`), `<pre class="c-highlight">`)
    .replace(new RegExp(`class="hljs-`, `g`), `class="c-highlight__`)
    .replace(new RegExp(`(<p>)?XDIVclass=(.*?)X(</p>)?`, `g`), `<div class="$2">`)
    .replace(new RegExp(`/XDIVX`, `g`), `</div>`)
    .replace(new RegExp(`<p><div`, `g`), `<div`)
    .replace(new RegExp(`</div></p>`, `g`), `</div>`)
    // Style links and make them SEO friendly.
    .replace(new RegExp(`<a`, `g`), `<a class="c-anchor" rel="nofollow"`);

  // eslint-disable-next-line no-param-reassign, prefer-destructuring
  data.metaDescription = data.packageContent.match(/<p>(.*?)<\/p>/)[1];

  hbs2html(packageTemplate, data, outputFile);
};
