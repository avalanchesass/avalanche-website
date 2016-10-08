const path = require('path');
const fs = require('fs');

module.exports = (srcpath) =>
  fs.readdirSync(srcpath).filter((file) =>
    fs.statSync(path.join(srcpath, file)).isDirectory()
  );
