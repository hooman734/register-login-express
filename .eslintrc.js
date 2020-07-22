module.exports = {
  ignorePatterns: ['build/*'],
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'no-console': 0,
    'import/prefer-default-export': 0,
    'no-return-await': 0,
  },
};
