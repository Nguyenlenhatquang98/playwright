import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 100000,
  expect: {
    timeout: 10000,
  },
});
