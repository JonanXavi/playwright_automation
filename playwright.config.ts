import { defineConfig, devices } from '@playwright/test';
import * as os from 'node:os';
import { ENV } from './utils/env';

export default defineConfig({
    testDir: './tests',
    timeout: 2 * 60 * 1000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 2,
    workers: process.env.CI ? 1 : 2,
    reporter: [
        [
            'allure-playwright',
            {
                environmentInfo: {
                    os_platform: os.platform(),
                    os_release: os.release(),
                    os_version: os.version(),
                    node_version: process.version,
                },
            },
        ],
    ],
    use: {
        baseURL: ENV.BASE_URL,
        ignoreHTTPSErrors: true,
    },

    projects: [
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/,
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
                    'Content-Type': 'application/json',
                },
            },
        },
    ],
});
