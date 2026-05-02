import { test, expect } from '../../fixtures/base';
import * as allure from 'allure-js-commons';
import users from '../../data/users.json';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login | User authentication flow', { tag: '@ui' }, () => {
    test.beforeEach(async () => {
        await allure.owner('Jonathan Fernández');
        await allure.tags('Authentication');
    });

    test('Displays a validation message when the username field is left empty', async ({ authPage }) => {
        await allure.severity('minor');
        await allure.description('Displays an error message when the username field is left empty');

        await test.step('Attempt to login without entering any credentials', async () => {
            await authPage.clickLoginButton();
        });

        await test.step('Validate that the required username error message is shown', async () => {
            const userErrorMessage = await authPage.getErrorMessage();
            expect(userErrorMessage).toContain('Username is required');
        });
    });

    test('Displays a validation message when the password field is left empty', async ({ testUser, authPage }) => {
        await allure.severity('minor');
        await allure.description('Displays an error message when the password field is left empty');

        await test.step('Enter a valid username', async () => {
            await authPage.typeUsername(testUser.username);
        });

        await test.step('Attempt to login without entering a password', async () => {
            await authPage.clickLoginButton();
        });

        await test.step('Validate that the required password error message is shown', async () => {
            const passwordErrorMessage = await authPage.getErrorMessage();
            expect(passwordErrorMessage).toContain('Password is required');
        });
    });

    test('Prevents login when invalid credentials are provided', async ({ authPage }) => {
        await allure.severity('critical');
        await allure.description('Prevents login when the provided credentials are incorrect');

        const userData = users.invalidUser;

        await test.step('Enter invalid username and password', async () => {
            await authPage.typeUsername(userData.username);
            await authPage.typePassword(userData.password);
        });

        await test.step('Submit the login form', async () => {
            await authPage.clickLoginButton();
        });

        await test.step('Validate that an authentication error message is displayed', async () => {
            const userErrorMessage = await authPage.getErrorMessage();
            expect(userErrorMessage).toContain('Username and password do not match any user in this service');
        });
    });

    test('Denies access to a locked user account', async ({ authPage }) => {
        await allure.severity('critical');
        await allure.description('Verifies that a locked user cannot log in');

        const userData = users.lockedUser;

        await test.step('Enter valid credentials for a locked user', async () => {
            await authPage.typeUsername(userData.username);
            await authPage.typePassword(userData.password);
        });

        await test.step('Submit the login form', async () => {
            await authPage.clickLoginButton();
        });

        await test.step('Validate that the locked account error message is displayed', async () => {
            const userErrorMessage = await authPage.getErrorMessage();
            expect(userErrorMessage).toContain('Sorry, this user has been locked out');
        });
    });

    test('Allows a registered user to login successfully', async ({ testUser, authPage, productListPage }) => {
        await allure.severity('blocker');
        await allure.description('Allows a registered user to log in successfully');

        await test.step('Enter valid user credentials', async () => {
            await authPage.typeUsername(testUser.username);
            await authPage.typePassword(testUser.password);
        });

        await test.step('Submit the login form', async () => {
            await authPage.clickLoginButton();
        });

        await test.step('Validate that the user is redirected to the products page', async () => {
            const productsTitle = await productListPage.getProductsTitle();
            expect(productsTitle).toContain('Products');
        });
    });

    test('Logs out the user and redirects to the login page', async ({ testUser, authPage, menuPage, productListPage }) => {
        await allure.severity('critical');
        await allure.description('Logs out the user and redirects them to the login page');

        await test.step('Login using valid credentials', async () => {
            await authPage.login(testUser.username, testUser.password);
        });

        await test.step('Open the navigation menu', async () => {
            await productListPage.clickOnTheMenuButton();
        });

        await test.step('Click on the logout option', async () => {
            await menuPage.clickOnTheLogoutOption();
        });

        await test.step('Validate that the login page is displayed', async () => {
            const logoVisibility = await authPage.isLogoVisible();
            expect(logoVisibility).toBe(true);
        });
    });
});
