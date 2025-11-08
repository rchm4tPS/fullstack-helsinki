import globals from 'globals'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ...js.configs.recommended,
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },
  {
    ignores: ['dist/**'],
  },
])
