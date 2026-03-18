import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    // tell eslint the code runs in a browser, not node
    languageOptions: { globals: globals.browser },
  },
  // load the recommended react rules first
  pluginReact.configs.flat.recommended,
  {
    // then override with our own settings after
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // modern react doesnt need react imported in every file
      'react/react-in-jsx-scope': 'off',
    },
  },
]);