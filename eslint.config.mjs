import js from "@eslint/js";
import globals from "globals";

/** Issue: Unable to resolve path to module 'typescript-eslint'.eslintimport/no-unresolved  */
import tseslint from "typescript-eslint";

/** Issue: it's not working too */
// import { configs, config } from "typescript-eslint";

import prettier from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  importPlugin.flatConfigs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ["packages/backend/**/*.ts"],
    rules: {},
  },
  {
    files: ["packages/frontend/**/*.{ts,tsx}"],
    settings: {
      "import/resolver": {
        typescript: {
          project: "./packages/sms/tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          paths: ["packages/frontend"],
        },
      },
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          pathGroups: [
            {
              pattern: "next*",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "react*",
              group: "builtin",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          alphabetize: {
            order: "asc",
          },
          warnOnUnassignedImports: true,
        },
      ],
    },
  },
);
