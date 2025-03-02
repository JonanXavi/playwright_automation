import { defineConfig, devices } from '@playwright/test';
import { config } from "dotenv";
import { ENV } from "./utils/env";

const environment = process.env.ENVIRONMENT || 'dev';
const envFile = `.env.${environment}`;
console.log('Environment file:', envFile);

config({
  path: envFile,
  override: true,
});

export default defineConfig({
  testDir: './tests',
  timeout: 2 * 60 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 2,
  workers: process.env.CI ? 1 : 1,
  reporter: 'html',
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
      //! API
      use: {
        baseURL: 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: {
          'Content-Type': 'application/json'
        },
      },
    },
  ],
});