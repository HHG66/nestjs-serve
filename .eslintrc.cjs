module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['dist/', '.eslintrc.cjs', 'node_modules/', 'test/', '.git/', 'logs/'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-trailing-spaces': ['error', { ignoreComments: true }],
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'],
    endOfLine: 'crlf',
    'operator-linebreak': ['off', 'after'], // 或者完全删除这条规则
  },
};
