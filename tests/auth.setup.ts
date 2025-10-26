import { test as setup, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth/auth_page';
import { ENV } from '../utils/env';

setup('User authentication', async ({ page }) => {
    const authPage = new AuthPage(page);

    await page.goto('/');
    await authPage.login(ENV.USER, ENV.PASSWORD);
    await expect(page).toHaveURL('/inventory.html');
    await page.context().storageState({ path: '.auth/login.json' });
})
