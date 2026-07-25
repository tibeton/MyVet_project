import { defineTheme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral";

// MyVet brand theme. Extends neutral so the full token set carries over —
// we only override the brand accent and the site's own font stack.
export default defineTheme({
  name: "myvet",
  extends: neutralTheme,
  tokens: {
    "--color-accent": "#4b5cc4",
    "--font-family-heading": "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
    "--font-family-body": "var(--font-onest), ui-sans-serif, system-ui, sans-serif",
  },
});
