import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";
import replace from "@rollup/plugin-replace";
import sveltePreprocess from "svelte-preprocess";
import smelte from "smelte/rollup-plugin-smelte";

import { config } from "dotenv";

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "./public/build/bundle.js",
  },
  plugins: [
    replace({
      // stringify the object
      __process: JSON.stringify({
        env: {
          ...process.env,
          ...config().parsed,
        },
      }),
    }),
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    smelte({
      purge: production,
      output: "public/global.css",
      tailwind: {
        theme: {
          extend: {
            spacing: {
              72: "18rem",
              84: "21rem",
              96: "24rem",
            },
          },
        }, // Extend Tailwind theme
        colors: {
          primary: "#b027b0",
          secondary: "#009688",
          error: "#f44336",
          success: "#4caf50",
          alert: "#ff9800",
          blue: "#2196f3",
          dark: "#212121",
        }, // Object of colors to generate a palette from, and then all the utility classes
        darkMode: true,
      }, // Any other props will be applied on top of default Smelte tailwind.config.js
    }),
    css({ output: "bundle.css" }),

    resolve(),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("./public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
