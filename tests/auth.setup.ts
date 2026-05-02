import { test as setup, expect } from '../fixtures/base';
import { ENV } from '../utils/env';

setup('User authentication', async ({ page, authPage }) => {
    await authPage.login(ENV.USER, ENV.PASSWORD);
    await expect(page).toHaveURL('/inventory.html');
    await page.context().storageState({ path: '.auth/login.json' });
});
