import { defineConfig } from 'eslint-define-config';
import eslintImport from 'eslint-plugin-import';
import eslintPrettier from 'eslint-plugin-prettier';
import eslintTypeScript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.js'],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts', '.json'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        module: true,
        require: true,
      },
    },
    plugins: {
      '@typescript-eslint': eslintTypeScript,
      import: eslintImport,
      prettier: eslintPrettier,
    },
    rules: {
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
]);
