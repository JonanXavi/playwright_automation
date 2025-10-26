import { test, expect } from '../../fixtures/base';
import users from '../../data/users.json';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Validate the correct behavior of the login functionality on the website', { tag: '@ui'}, () => {
    test('Confirm that the username field is validated as required in the login form', async ({ authPage }) => {
        await test.step('Click the "Login" button without entering any credentials', async () => {
            await authPage.clickLoginButton();
        })

        await test.step('Verify that the "Username is required" validation message is displayed', async () => {
            const userErrorMessage = await authPage.getErrorMessage();
            expect(userErrorMessage).toContain('Username is required');
        })
    })

    test('Confirm that the password field is validated as required in the login form', async ({ testUser, authPage }) => {
        await test.step('Enter a valid username in the login form', async () => {
            await authPage.typeUsername(testUser.username);
        })

        await test.step('Click the "Login" button without entering a password', async () => {
            await authPage.clickLoginButton();
        })

        await test.step('Verify that the "Password is required" validation message is displayed', async () => {
            const passwordErrorMessage = await authPage.getErrorMessage();
            expect(passwordErrorMessage).toContain('Password is required');
        })
    })

    test('Confirm that login is rejected when using invalid credentials', async ({ authPage }) => {
        const userData = users.invalidUser;

        await test.step('Enter invalid username and/or password in the login form', async () => {
            await authPage.typeUsername(userData.username);
            await authPage.typePassword(userData.password);
        })

        await test.step('Click the "Login" button', async () => {
            await authPage.clickLoginButton();
        })

        await test.step('Verify that access is denied and an appropriate error message is displayed', async () => {
            const userErrorMessage = await authPage.getErrorMessage();
            expect(userErrorMessage).toContain('Username and password do not match any user in this service');
        })
    })

    test('Confirm that login is rejected for a locked user account', async ({ authPage }) => {
        const userData = users.lockedUser;

        await test.step('Enter valid credentials for a locked user in the login form', async () => {
            await authPage.typeUsername(userData.username);
            await authPage.typePassword(userData.password);
        })

        await test.step('Click the "Login" button', async () => {
            await authPage.clickLoginButton();
        })

        await test.step('Verify that access is denied and a corresponding error message is displayed', async () => {
            const userErrorMessage = await authPage.getErrorMessage();
            expect(userErrorMessage).toContain('Sorry, this user has been locked out');
        })
    })

    test('Confirm that a registered user can successfully login', async ({ testUser, authPage, productListPage }) => {
        await test.step('Enter valid credentials for a registered user in the login form', async () => {
            await authPage.typeUsername(testUser.username);
            await authPage.typePassword(testUser.password);
        })

        await test.step('Click the "Login" button', async () => {
            await authPage.clickLoginButton();
        })

        await test.step('Verify that the user is successfully authenticated and granted access to the website', async () => {
            const productsTitle = await productListPage.getProductsTitle();
            expect(productsTitle).toContain('Products');
        })
    })

    test('Confirm that the user is successfully logged out of the session', async ({ testUser, authPage, menuPage, productListPage }) => {
        await test.step('Log in using valid credentials', async () => {
            await authPage.login(testUser.username, testUser.password);
        })

        await test.step('Open the navigation menu by clicking the menu button', async () => {
            await productListPage.clickOnTheMenuButton();
        })

        await test.step('Select the "Logout" option from the menu', async () => {
            await menuPage.clickOnTheLogoutOption();
        })

        await test.step('Verify that the user is redirected to the login page and the application logo is visible', async () => {
            const logoVisibility = await authPage.isLogoVisible();
            expect(logoVisibility).toBe(true);
        })
    })
});