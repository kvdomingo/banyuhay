import * as tailwindPlugin from "prettier-plugin-tailwindcss";
import sveltePlugin from "prettier-plugin-svelte";

export default {
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
  plugins: [sveltePlugin, tailwindPlugin],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};
