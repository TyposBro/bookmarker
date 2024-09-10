import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import css from "rollup-plugin-css-only";
import { copyFileSync } from "fs";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/content-script/main.js",
  output: {
    file: "public/content-script.js",
    format: "iife",
    name: "app",
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: !production,
      },
      // Ensure that the CSS is handled by the css plugin
      emitCss: true,
    }),
    // This plugin will handle the emitted CSS
    css({ output: "content-script.css" }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    !production && serve("public"),
    !production && livereload("public"),
    production && terser(),
    {
      name: "copy-manifest",
      buildEnd() {
        copyFileSync("src/manifest.json", "public/manifest.json");
      },
    },
  ],
  watch: {
    clearScreen: false,
  },
};
