import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import unicorn from 'eslint-plugin-unicorn';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      unicorn,
    },
    rules: {
      /**
       * Enforce PascalCase for component files
       * This ensures all React component files follow the naming convention
       * Exceptions are made for:
       * - Entry points (main.tsx)
       * - Config files (vite.config.ts, eslint.config.js)
       * - Type declarations (vite-env.d.ts)
       * - Test setup files (setupTests.ts)
       * - CSS files
       */
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            pascalCase: true,
          },
          ignore: [
            '^vite-env\\.d\\.ts$',
            '^setupTests\\.ts$',
            '^main\\.tsx$',
            '^vite\\.config\\.ts$',
            '^eslint\\.config\\.js$',
            '^.*\\.css$',
          ],
        },
      ],
    },
  },
]);
