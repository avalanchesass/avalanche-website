const declarationBlockPropertiesOrder = require('./.csscomb.json')['sort-order'][0];

module.exports = {
  extends: `stylelint-config-modularis`,
  rules: {
    'at-rule-empty-line-before': ['always', {
      except: ['blockless-group'],
      ignore: ['after-comment', 'all-nested']
    }],
    'declaration-block-properties-order': declarationBlockPropertiesOrder,
    'no-indistinguishable-colors': [true, { threshold: 1 }]
  }
};
