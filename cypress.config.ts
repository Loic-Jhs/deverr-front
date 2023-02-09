import { defineConfig } from "cypress";
import customViteConfig from "./vite.config.ts";
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5174",
    viewportWidth: 1920,
    viewportHeight: 1080,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: customViteConfig,
    },
  },

});
