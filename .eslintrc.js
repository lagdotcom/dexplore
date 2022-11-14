/** @type {import('@types/eslint').ESLint.Options['baseConfig']} */
// eslint-disable-next-line no-undef
module.exports = {
  env: { browser: true, es2021: true, node: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: "detect" },
    "import/resolver": { node: { extensions: [".js", ".jsx", ".ts", ".tsx"] } },
  },
  plugins: [
    "@typescript-eslint",
    "jsx-a11y",
    "prettier",
    "promise",
    "react",
    "react-hooks",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:promise/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "crlf" }],
  },
};
