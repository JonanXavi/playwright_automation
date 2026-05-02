import { test, expect } from '../../fixtures/base';
import * as allure from 'allure-js-commons';
import { ENV } from '../../utils/env';
import { generateUserData } from '../../utils/testdata';
import products from '../../data/products.json';

test.describe('Checkout | Purchase flow', { tag: '@ui' }, () => {
    test.beforeEach(async ({ authPage }) => {
        await allure.owner('Jonathan Fernández');
        await allure.tags('Checkout');

        await authPage.login(ENV.USER, ENV.PASSWORD);
    });

    test('Allows users to successfully complete a purchase', async ({ productListPage, cartPage, checkoutPage }) => {
        await allure.severity('blocker');
        await allure.description(
            'Verifies that a user can successfully complete the full purchase flow, including cart review, checkout form submission, and order confirmation.'
        );

        const productNames = products.map((product) => product.name);
        const userData = generateUserData();

        await test.step('Add products to the shopping cart', async () => {
            for (const product of productNames) {
                await productListPage.addProductToCartFromPLP(product);
            }
        });

        await test.step('Open the shopping cart', async () => {
            await productListPage.clickOnTheShoppingCart();
        });

        await test.step('Proceed to checkout', async () => {
            await cartPage.clickCheckoutButton();
        });

        await test.step('Enter valid checkout information', async () => {
            await checkoutPage.typeFirstName(userData.firstName);
            await checkoutPage.typeLastName(userData.lastName);
            await checkoutPage.typeZipCode(userData.zip);
        });

        await test.step('Continue to the checkout overview', async () => {
            await checkoutPage.clickContinueButton();
        });

        await test.step('Complete the purchase', async () => {
            await checkoutPage.clickFinishButton();
        });

        await test.step('Validate that the order confirmation is displayed', async () => {
            const actualHeaderText = await checkoutPage.getOrderHeaderText();
            const actualMessageText = await checkoutPage.getOrderMessageText();

            expect.soft(actualHeaderText).toContain('Thank you for your order!');
            expect
                .soft(actualMessageText)
                .toContain('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        });
    });
});
