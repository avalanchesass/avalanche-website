const declarationBlockPropertiesOrder = require('./.csscomb.json')['sort-order'][0];

module.exports = {
  extends: `stylelint-config-modularis`,
  rules: {
    'declaration-block-properties-order': declarationBlockPropertiesOrder,
    'no-indistinguishable-colors': [true, { threshold: 1 }]
  }
};
