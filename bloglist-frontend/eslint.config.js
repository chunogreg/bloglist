import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactPugin from "eslint-plugin-react";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      //globals: globals.browser,
      globals: { ...globals.vitest },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react: reactPugin,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-alert": "off",
      "react/prop-types": "off",
      eqeqeq: "error",
      indent: ["error", 2],
      "no-debugger": "error",
      "react/jsx-uses-react": "off",
      "no-undef": "off",
      //"react/jsx-key": "error",
    },
  },
];
