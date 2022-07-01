module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', '@emotion'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error', { singleQuote: true }],
    '@typescript-eslint/no-empty-function': 0,
  },
};
