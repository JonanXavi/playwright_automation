import { test, expect } from '../../fixtures/base';
import users from '../../data/users.json';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Validate the correct behavior of the login functionality on the website', { tag: '@ui'}, () => {
    test('Confirm that the username field is validated as required in the login form', async ({ loginPage }) => {
        await test.step('Click the "Login" button without entering any credentials', async () => {
            await loginPage.clickLoginButton();
        })

        await test.step('Verify that the "Username is required" validation message is displayed', async () => {
            const userErrorMessage = await loginPage.getErrorMessage();
            expect(userErrorMessage).toContain('Username is required');
        })
    })

    test('Confirm that the password field is validated as required in the login form', async ({ testUser, loginPage }) => {
        await test.step('Enter a valid username in the login form', async () => {
            await loginPage.typeUsername(testUser.username);
        })

        await test.step('Click the "Login" button without entering a password', async () => {
            await loginPage.clickLoginButton();
        })

        await test.step('Verify that the "Password is required" validation message is displayed', async () => {
            const passwordErrorMessage = await loginPage.getErrorMessage();
            expect(passwordErrorMessage).toContain('Password is required');
        })
    })

    test('Confirm that login is rejected when using invalid credentials', async ({ loginPage }) => {
        const userData = users.invalidUser;

        await test.step('Enter invalid username and/or password in the login form', async () => {
            await loginPage.typeUsername(userData.username);
            await loginPage.typePassword(userData.password);
        })

        await test.step('Click the "Login" button', async () => {
            await loginPage.clickLoginButton();
        })

        await test.step('Verify that access is denied and an appropriate error message is displayed', async () => {
            const userErrorMessage = await loginPage.getErrorMessage();
            expect(userErrorMessage).toContain('Username and password do not match any user in this service');
        })
    })

    test('Confirm that login is rejected for a locked user account', async ({ loginPage }) => {
        const userData = users.lockedUser;

        await test.step('Enter valid credentials for a locked user in the login form', async () => {
            await loginPage.typeUsername(userData.username);
            await loginPage.typePassword(userData.password);
        })

        await test.step('Click the "Login" button', async () => {
            await loginPage.clickLoginButton();
        })

        await test.step('Verify that access is denied and a corresponding error message is displayed', async () => {
            const userErrorMessage = await loginPage.getErrorMessage();
            expect(userErrorMessage).toContain('Sorry, this user has been locked out');
        })
    })

    test('Confirm that a registered user can successfully login', async ({ testUser, loginPage, productsPage }) => {
        await test.step('Enter valid credentials for a registered user in the login form', async () => {
            await loginPage.typeUsername(testUser.username);
            await loginPage.typePassword(testUser.password);
        })

        await test.step('Click the "Login" button', async () => {
            await loginPage.clickLoginButton();
        })

        await test.step('Verify that the user is successfully authenticated and granted access to the website', async () => {
            const productsTitle = await productsPage.getProductsTitle();
            expect(productsTitle).toContain('Products');
        })
    })

    test('Confirm that the user is successfully logged out of the session', async ({ testUser, loginPage, productsPage }) => {
        await test.step('Log in using valid credentials', async () => {
            await loginPage.login(testUser.username, testUser.password);
        })

        await test.step('Open the navigation menu by clicking the menu button', async () => {
            await productsPage.clickOnTheMenuButton();
        })

        await test.step('Select the "Logout" option from the menu', async () => {
            await productsPage.clickOnTheLogoutOption();
        })

        await test.step('Verify that the user is redirected to the login page and the application logo is visible', async () => {
            const logoVisibility = await loginPage.isLogoVisible();
            expect(logoVisibility).toBe(true);
        })
    })
});