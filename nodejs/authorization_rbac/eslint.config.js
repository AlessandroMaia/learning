import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [pluginJs.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,js}'],
    languageOptions: { globals: globals.node, },
    plugins: { },
    rules: {
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      '@typescript-eslint/no-explicit-any': 'off'
    },
  },
);
