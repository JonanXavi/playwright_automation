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
    testIdAttribute: 'data-test',
    baseURL: ENV.BASE_URL,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/login.json',
      },
      dependencies: ['setup'],
    },

    /*{
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/
  ],
});
