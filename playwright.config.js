import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      scale: "css",
    },
  },
  fullyParallel: true,
  reporter: process.env.CI ? [["line"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: process.env.BASE_URL || "http://127.0.0.1:5000",
    ...devices["iPhone 12"],
    browserName: "chromium",
    colorScheme: "light",
    locale: "en-GB",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: process.env.BASE_URL || "http://127.0.0.1:5000",
    reuseExistingServer: true,
    timeout: 30_000,
  },
});