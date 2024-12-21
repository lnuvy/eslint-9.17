import js from "@eslint/js";
import globals from "globals";
/**
 * toggle below importPlugin.flatConfigs.recommended to see the difference
 */
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  // toggle 1
  // importPlugin.flatConfigs.recommended,
  {
    files: ["**/*.{ts,tsx}"],

    // toggle 2
    extends: [importPlugin.flatConfigs.recommended],
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
