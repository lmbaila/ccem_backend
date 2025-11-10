const js = require('@eslint/js');
const ts = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      prettier: prettierPlugin,
    },
    rules: {
      // Regras basicas
      ...ts.configs.recommended.rules,
      ...prettierConfig.rules,

      // Prettier
      'prettier/prettier': ['error', { endOfLine: 'auto' }],

      // Estilo
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // <- permite usar `any`
      'no-undef': 'off', // <- permite usar console, process, etc.
      'no-console': 'off', // <- permite console.log()
    },
  },
  {
    ignores: [
      'node_modules',
      'dist',
      '.prisma',
      'coverage',
      '*.js',
      '*.json',
    ],
  },
];
