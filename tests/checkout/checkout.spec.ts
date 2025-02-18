import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login_page';
import { ProductsPage } from '../../pages/products_page';
import { CheckoutPage } from '../../pages/checkout_page';
import { ENV } from '../../utils/env';
import products from '../../data/products.json';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login(ENV.USER, ENV.PASSWORD);
});

test.describe('Verify that the checkout functionality on the website works correctly', () => {
    test('Ensure that purchases can be completed on the website', {
        tag: ['@automation'],
    }, async ({ page }) => {
        const productPage = new ProductsPage(page);
        const checkoutPage = new CheckoutPage(page);
        const productNames = products.map(product => product.name);

        await test.step('Add products to the shopping cart', async () => {
            for (const product of productNames) {
                await productPage.addProductToCartFromPLP(product);
            }
        })

        await test.step('Click on the shopping cart icon', async () => {
            await productPage.clickOnTheShoppingCart();
        })

        await test.step('Click the "Checkout" button in the cart', async () => {
            await checkoutPage.clickCheckoutButton();
        })

        await test.step('Enter the required information in the "Checkout Information" form', async () => {
            await checkoutPage.typeFirstName('Allen');
            await checkoutPage.typeLastName('Brown');
            await checkoutPage.typeZipCode('17839');
        })

        await test.step('Click the "Continue" button in the "Checkout Information" section', async () => {
            await checkoutPage.clickContinueButton();
        })

        await test.step('Click the "Finish" button in the "Checkout Overview" section', async () => {
            await checkoutPage.clickFinishButton();
        })

        await test.step('Confirm that the order has been successfully created', async () => {
            const actualHeaderText = await checkoutPage.getOrderHeaderText();
            const actualMessageText = await checkoutPage.getOrderMessageText();

            expect.soft(actualHeaderText).toContain('Thank you for your order!');
            expect.soft(actualMessageText).toContain('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        })
    })
})