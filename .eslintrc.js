module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-multi-spaces': ['error'],
    'no-multiple-empty-lines': 'error',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ArrayExpression: 'first'
      }
    ]
  }
};
