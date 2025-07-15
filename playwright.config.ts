import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 100000,
  expect: {
    timeout: 10000,
  },
  workers: 1,
  reporter: "list",
  projects: [
    {
      name: "OnlyChromium",
      use: {
        browserName: "chromium",
        headless: false,
        viewport: null,
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },
  ],
});
