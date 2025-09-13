import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [{
  ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
}, ...compat.config({
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    'comma-dangle': ['error', {
      'objects': 'always-multiline',
      'arrays': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'always-multiline',
    }],
    'max-len': ['warn', { 'code': 120, 'ignoreStrings': true, 'ignoreComments': true }],
    'no-param-reassign': 'off',
    'no-redeclare': 'off',
    'no-undef': 'off',
    'no-underscore-dangle': 'off', // We have _uid from Storyblok that can't be changed
    'object-curly-newline': ['error', { 'consistent': true, 'minProperties': 4 }],
    'import/extensions': 'off',
    'no-shadow': 'off',
    'jsx-a11y/label-has-associated-control': [ 2, {
      'components': [ 'Label' ],
      'required': {
        'some': [ 'nesting', 'id' ],
      },
    }],
    'jsx-quotes': ['error', 'prefer-double'],
    'quotes': [2, 'single',
      { 'avoidEscape': true, 'allowTemplateLiterals': true },
    ],
    'space-before-function-paren': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/jsx-handler-names': 0,
    'react/jsx-filename-extension': [
      'error',
      {
        'extensions': [
            '.js',
            '.ts',
            '.jsx',
            '.tsx',
        ],
      },
    ],
    'react/jsx-fragments': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/no-unused-prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-no-useless-fragment': [2, { 'allowExpressions': true }], // https://github.com/jsx-eslint/eslint-plugin-react/issues/2584
    'react/jsx-indent': [2, 2],
    'react/display-name': 0,
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-cycle': 0,
    'import/no-unresolved': 0,
    'no-unused-vars': 0,
    'no-multi-spaces': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        'vars': 'local',
        'args': 'none',
      },
    ],
    'import/export': 0,
    'func-names': 0,
    'semi': [1, 'always'], // 1 is for warning
    '@next/next/no-img-element': 0,
  },
}), {
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    // Stylistic
    '@stylistic/no-trailing-spaces': 'error',
  },
}];

export default eslintConfig;
