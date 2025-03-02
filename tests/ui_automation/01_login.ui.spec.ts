import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login_page';
import { ProductsPage } from '../../pages/products_page';
import users from '../../data/users.json';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Verify that the login functionality on the website works correctly', { tag: '@ui'}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    })

    test('All mandatory fields are present in the "Login" form', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const userData = users[0];

        await test.step('Click the "Log in" button in the form without entering any data', async () => {
            await loginPage.clickLoginButton();
        })

        await test.step('Confirm that the "Required username" message is displayed', async () => {
            const userErrorMessage = await loginPage.getErrorMessage();
            expect.soft(userErrorMessage).toContain('Username is required');
        })

        await test.step('Enter a username in the "Login" form and click the "Login" button', async () => {
            await loginPage.typeUsername(userData.username);
            await loginPage.clickLoginButton();
        })

        await test.step('Confirm that the "Required password" message is displayed', async () => {
            const passwordErrorMessage = await loginPage.getErrorMessage();
            expect.soft(passwordErrorMessage).toContain('Password is required');
        })
    })

    test('Ensure that login is not possible using a blocked user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const userData = users[0];

        await test.step('Enter the required information in the "Login" form', async () => {
            await loginPage.typeUsername(userData.username);
            await loginPage.typePassword(userData.password);
        })

        await test.step('Click the "Login" button in the form', async () => {
            await loginPage.clickLoginButton();
        })

        await test.step('Confirm that access is denied for the blocked user', async () => {
            const userErrorMessage = await loginPage.getErrorMessage();
            expect(userErrorMessage).toContain('Sorry, this user has been locked out');
        })
    })

    test('Ensure that login is possible using a registered user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const userData = users[1];

        await test.step('Enter the required information in the "Login" form', async () => {
            await loginPage.typeUsername(userData.username);
            await loginPage.typePassword(userData.password);
        })

        await test.step('Click the "Login" button in the form', async () => {
            await loginPage.clickLoginButton();
        })

        await test.step('Confirm that the user is successfully logged into the website', async () => {
            const productsTitle = await productsPage.getProductsTitle();
            expect(productsTitle).toContain('Products');
        })
    })
});