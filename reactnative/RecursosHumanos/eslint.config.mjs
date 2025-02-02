import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-require-imports': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            // {
            //   name: 'react-native',
            //   importNames: ['TextInput'],
            //   message: 'import \'Text\' de \'ui/components\'',

            // },
          ],
        },
      ],
    },
  },
];
