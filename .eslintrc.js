module.exports = {
  extends: ['erb', '@rubykgen/eslint-config/node'],
  plugins: ['@typescript-eslint'],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'import/no-cycle': 'off',

    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-bind': 'off',
    'react/prop-types': 'off',
    'react/no-danger': 'off',

    'jsx-a11y/heading-has-content': 'off',
    'default-param-last': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'global-require': 'off',
    camelcase: 'off',

    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/no-import-module-exports': 'off',

    'no-shadow': 'off',
    'no-undef': 'off',
    'no-nested-ternary': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'no-return-assign': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
    'no-new': 'off',
    'no-callback-literal': 'off',

    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
  },
  // parserOptions: {
  //   ecmaVersion: 2021,
  //   sourceType: 'module',
  //   project: './tsconfig.json',
  //   tsconfigRootDir: __dirname,
  //   createDefaultProgram: true,
  // },
  // settings: {
  //   'import/resolver': {
  //     // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
  //     node: {},
  //     webpack: {
  //       config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
  //     },
  //     typescript: {},
  //   },
  //   'import/parsers': {
  //     '@typescript-eslint/parser': ['.ts', '.tsx'],
  //   },
  // },
}
