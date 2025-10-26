import { test, expect } from '../../fixtures/base';
import { AuthPage } from "../../pages/auth/auth_page";
import { ENV } from '../../utils/env';
import { generateUserData } from '../../utils/testdata'
import products from '../../data/products.json';

test.describe('Validate the correct behavior of the checkout functionality on the website', { tag: '@ui'}, () => {
    test.beforeEach(async ({ page }) => {
        const authPage = new AuthPage(page);
        await authPage.login(ENV.USER, ENV.PASSWORD);
    })

    test('Confirm that purchases can be successfully completed on the website', async ({ productListPage, checkoutPage }) => {
        const productNames = products.map(product => product.name);
        const userData = generateUserData();

        await test.step('Add products to the shopping cart', async () => {
            for (const product of productNames) {
                await productListPage.addProductToCartFromPLP(product);
            }
        })

        await test.step('Click the shopping cart icon to open the cart', async () => {
            await productListPage.clickOnTheShoppingCart();
        })

        await test.step('Click the “Checkout” button', async () => {
            await checkoutPage.clickCheckoutButton();
        })

        await test.step('Enter the required information in the “Checkout Information” form', async () => {
            await checkoutPage.typeFirstName(userData.firstName);
            await checkoutPage.typeLastName(userData.lastName);
            await checkoutPage.typeZipCode(userData.zip);
        })

        await test.step('Click the “Continue” button', async () => {
            await checkoutPage.clickContinueButton();
        })

        await test.step('Click the “Finish” button in the “Checkout Overview” section', async () => {
            await checkoutPage.clickFinishButton();
        })

        await test.step('Verify that the order has been successfully created', async () => {
            const actualHeaderText = await checkoutPage.getOrderHeaderText();
            const actualMessageText = await checkoutPage.getOrderMessageText();

            expect.soft(actualHeaderText).toContain('Thank you for your order!');
            expect.soft(actualMessageText).toContain('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        })
    })
})
