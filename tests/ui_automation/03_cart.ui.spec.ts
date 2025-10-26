import { test, expect } from '../../fixtures/base';
import { AuthPage } from "../../pages/auth/auth_page";
import { ENV } from '../../utils/env';
import products from '../../data/products.json';

test.describe('Validate the correct behavior of the cart functionality on the website', { tag: '@ui'},  () => {
    test.beforeEach(async ({ page }) => {
        const authPage = new AuthPage(page);
        await authPage.login(ENV.USER, ENV.PASSWORD);
    })

    test('Confirm that products can be added to the cart from the Product Listing Page (PLP)', async ({ productListPage }) => {
        const productNames = products.map(product => product.name);
        const productsNumber = productNames.length;

        await test.step('Add one or more products to the shopping cart from the Product Listing Page (PLP)', async () => {
            for (const product of productNames) {
                await productListPage.addProductToCartFromPLP(product);
            }
        })

        await test.step('Verify that the cart icon reflects the correct number of items added', async () => {
            await expect(productListPage.shoppingCartBadge).toHaveText(String(productsNumber));
        })
    })

    test('Confirm that products can be added to the cart from the Product Detail Page (PDP)', async ({ productListPage, productDetailPage, cartPage }) => {
        const productNames = products.map(product => product.name);

        await test.step('For each desired product, navigate to its Product Detail Page (PDP), add it to the cart, and return to the Product Listing Page (PLP)', async () => {
            for (const product of productNames) {
                await productListPage.clickOnProduct(product);
                await productDetailPage.clickAddToCartButton();
                await productDetailPage.clickBackToProductsButton();
            }
        })

        await test.step('Click the shopping cart icon to open the cart', async () => {
            await productListPage.clickOnTheShoppingCart();
        })

        await test.step('Verify that all selected products are correctly listed in the shopping cart', async () => {
            const actualProductNames = await cartPage.getProductNames();
            expect(actualProductNames).toEqual(productNames);
        })
    })

    test('Confirm that products can be removed from the shopping cart', async ({ productListPage, cartPage }) => {
        const productNames = products.map(product => product.name);

        await test.step('Add one or more products to the shopping cart from the Product Listing Page (PLP)', async () => {
            for (const product of productNames) {
                await productListPage.addProductToCartFromPLP(product);
            }
        })

        await test.step('Click the shopping cart icon to open the cart', async () => {
            await productListPage.clickOnTheShoppingCart();
        })

        await test.step('For each product in the cart: click the delete button to remove it', async () => {
            for (const product of productNames) {
                await cartPage.deleteProductOnCart(product);
            }
        })

        await test.step('Verify that the shopping cart is empty', async () => {
            await expect(cartPage.cartItem).toHaveCount(0);
        })
    })
})