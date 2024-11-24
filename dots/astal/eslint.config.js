import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    ignores: ["**@girs/**", "env.d.ts", "eslint.config.js"],
  },
  {
    settings: {
      "import/resolver": { typescript: true },
    },
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      camelcase: "warn",
      "import/no-nodejs-modules": "warn",
    },
  },
  {
    rules: {
      "import/no-deprecated": "warn",
      "import/no-empty-named-blocks": "error",
      "import/no-mutable-exports": "error",
      "import/no-unused-modules": "warn",
      "import/no-cycle": "error",
      "import/no-useless-path-segments": "error",
      "import/consistent-type-specifier-style": ["error", "prefer-inline"],
      "import/first": "warn",
      "import/newline-after-import": [
        "warn",
        {
          count: 1,
          exactCount: true,
          considerComments: true,
        },
      ],
      "import/no-default-export": "error",
      "import/order": [
        "warn",
        {
          "newlines-between": "never",
          distinctGroup: false,
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          groups: [
            "builtin",
            "external",
            "internal",
            "sibling",
            "parent",
            "type",
            "index",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "~/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "$*",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
        },
      ],
    },
  },
);
