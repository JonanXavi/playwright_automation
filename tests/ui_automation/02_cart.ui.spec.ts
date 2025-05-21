import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login_page';
import { ProductsPage } from '../../pages/products_page';
import { CartPage } from '../../pages/cart_page';
import { ENV } from '../../utils/env';
import products from '../../data/products.json';

test.describe('Verify that the cart functionality on the website works correctly', { tag: '@ui'},  () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto('/');
        await loginPage.login(ENV.USER, ENV.PASSWORD);
    })

    test('Add products to the cart from the PLP (Product Listing Page) on the website', async ({ page }) => {
        const productPage = new ProductsPage(page);
        const productNames = products.map(product => product.name);
        const productsNumber = productNames.length;

        await test.step('Add products to the shopping cart', async () => {
            for (const product of productNames) {
                await productPage.addProductToCartFromPLP(product);
            }
        })

        await test.step('Confirm that the number of products in the shopping cart is updated correctly', async () => {
            await expect(productPage.shoppingCartBadge).toHaveText(String(productsNumber));
        })
    })

    test('Add products to the cart from the PDP (Product Detail Page) on the website', async ({ page }) => {
        const productPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const productNames = products.map(product => product.name);

        await test.step('Click on a product, add it to the cart, and return to the products page', async () => {
            for (const product of productNames) {
                await productPage.clickOnProduct(product);
                await productPage.clickAddToCartButton();
                await productPage.clickBackToProductsButton();
            }
        })

        await test.step('Click on the shopping cart icon', async () => {
            await productPage.clickOnTheShoppingCart();
        })

        await test.step('Confirm the products in the shopping cart is correct', async () => {
            const actualProductNames = await cartPage.getProductNames();
            expect(actualProductNames).toEqual(productNames);
        })
    })
})