import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login_page';
import { ProductsPage } from '../../pages/products_page';
import { ENV } from '../../utils/env';
import products from '../../data/products.json';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login(ENV.USER, ENV.PASSWORD);
});

test.describe('Verify that the products page on the website works correctly', () => {
    test('Ensure that products are displayed properly on the PLP (Product Listing Page)', {
        tag: ['@automation'],
    }, async ({ page }) => {
        const productPage = new ProductsPage(page);
        const productNames = products.map(product => product.name);
        const productDetails = products.map(product => product.description);
        const actualProductNames = await productPage.getProductNames();
        const actualProductDetails = await productPage.getProductDetails();

        await test.step('Confirm that all products on the page are loaded successfully', async () => {
            expect.soft(actualProductNames).toContain(productNames);
            expect.soft(actualProductDetails).toContain(productDetails);
        })
    })
});