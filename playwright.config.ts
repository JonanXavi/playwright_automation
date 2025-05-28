import { defineConfig, devices } from '@playwright/test';
import { ENV } from "./utils/env";

export default defineConfig({
  testDir: './tests',
  timeout: 2 * 60 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 2,
  workers: process.env.CI ? 1 : 1,
  reporter: [
      ['allure-playwright']
  ],
  use: {
    baseURL: ENV.BASE_URL,
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/
    },
    {
      name: 'ui_test',
      testMatch: /.*\.ui\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/login.json',
        testIdAttribute: 'data-test',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
      },
      dependencies: ['setup'],
    },
    {
      name: 'api_test',
      testMatch: /.*\.api\.spec\.ts/,
      use: {
        extraHTTPHeaders: {
          'Content-Type': 'application/json'
        },
      },
    },
  ],
});