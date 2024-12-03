module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true, 
  },
  rules: {
    'import/extensions': 'off',
    'camelcase': 'off',
    'no-restricted-globals': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off', 
    'prettier/prettier': 'off', 
    'no-unused-vars': 'warn', 
    'consistent-return': 'off', 
    'no-param-reassign': 'off', 
    'func-names': 'off', 
  },
  ignorePatterns: ['/node_modules/', '/dist/'], 
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
};

