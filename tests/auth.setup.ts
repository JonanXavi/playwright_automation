import { test as setup, expect } from '@playwright/test';
import { ENV } from "../utils/env";

setup("User authentication", async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('[id="loginusername"]').fill(ENV.USER);
    await page.locator('[id="loginpassword"]').fill(ENV.PASSWORD);
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.locator('[id="nameofuser"]')).toContainText(`Welcome ${ENV.USER}`);
    await page.context().storageState({ path: '.auth/login.json' });
});
