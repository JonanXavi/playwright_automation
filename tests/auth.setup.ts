import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login_page';
import { ENV } from '../utils/env';

setup('User authentication', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login(ENV.USER, ENV.PASSWORD);
    await expect(page).toHaveURL('/inventory.html');
    await page.context().storageState({ path: '.auth/login.json' });
})
