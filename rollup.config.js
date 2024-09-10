import { copyFileSync, readdirSync, statSync, mkdirSync } from "fs";
import { join } from "path";

import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import css from "rollup-plugin-css-only";

const production = !process.env.ROLLUP_WATCH;

function copyDir(src, dest) {
  if (!statSync(src).isDirectory()) {
    copyFileSync(src, dest);
    return;
  }

  mkdirSync(dest, { recursive: true });
  for (const file of readdirSync(src)) {
    const srcFile = join(src, file);
    const destFile = join(dest, file);
    if (srcFile.includes("content-script")) continue;
    copyDir(srcFile, destFile);
  }
}

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
        copyDir("src", "public");
      },
    },
  ],
  watch: {
    clearScreen: false,
  },
};
