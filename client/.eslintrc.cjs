module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    indent: ['error', 2, { 'SwitchCase': 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    semi: ['error', 'never'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '_' }],
    '@typescript-eslint/ban-ts-comment': ['warn'],
    '@typescript-eslint/no-var-requires': 'off',
    'react/no-deprecated': 'off',
    'max-len': ['warn', { ignoreComments: true, code: 110 }],
    'object-curly-spacing': ['warn', 'always'],
    'key-spacing': ['warn', { afterColon: true }],
    'arrow-spacing': 'warn',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'react/display-name': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        'prefer': 'type-imports'
      }
    ]
  }
}
