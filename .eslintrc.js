module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'sonarjs'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: 'src/**/*.ts',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:sonarjs/recommended',
      ],
      excludedFiles: '**/*.spec.ts',
      parserOptions: { project: ['./tsconfig.json'] },
      rules: {
        'no-magic-numbers': ['error', { ignore: [0, 1, -1] }],
        '@typescript-eslint/no-unused-vars': [
          'error',
          { args: 'all', argsIgnorePattern: '^_$' },
        ],
      },
    },
    {
      files: 'src/**/*.spec.ts',
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      parserOptions: { project: ['./tsconfig.spec.json'] },
      rules: {
        'no-magic-numbers': 'off',
        'id-length': 'off',
        'one-var': ['error', 'never'],
        '@typescript-eslint/no-unused-vars': [
          'error',
          { args: 'all', argsIgnorePattern: '^_$' },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
