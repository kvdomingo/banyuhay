import sortImports from "@trivago/prettier-plugin-sort-imports";
import sveltePlugin from "prettier-plugin-svelte";
import * as tailwindPlugin from "prettier-plugin-tailwindcss";

/** @typedef {import("prettier").Options} PrettierOptions */
/** @typedef {import("@trivago/prettier-plugin-sort-imports").PluginConfig} SortImportsOptions */
/** @typedef {PrettierOptions | SortImportsOptions} Options */

/** @type {Options} */
const options = {
  useTabs: false,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 2,
  arrowParens: "avoid",
  endOfLine: "lf",
  jsxSingleQuote: false,
  semi: true,
  quoteProps: "consistent",
  importOrder: [
    "^svelte$",
    "^svelte(.*)$",
    "^$app/(.*)$",
    "^$lib/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [sortImports, sveltePlugin, tailwindPlugin],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};

export default options;
