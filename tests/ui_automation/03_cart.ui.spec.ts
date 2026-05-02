import { test, expect } from '../../fixtures/base';
import * as allure from 'allure-js-commons';
import { ENV } from '../../utils/env';
import products from '../../data/products.json';

test.describe('Cart | Shopping cart functionality', { tag: '@ui' }, () => {
    test.beforeEach(async ({ authPage }) => {
        await allure.owner('Jonathan Fernández');
        await allure.tags('Cart');

        await authPage.login(ENV.USER, ENV.PASSWORD);
    });

    test('Allows users to add products to the cart from the Product Listing Page (PLP)', async ({ productListPage }) => {
        await allure.severity('blocker');
        await allure.description('Verifies that a user can add a product to the shopping cart directly from the Product Listing Page.');

        const productNames = products.map((product) => product.name);
        const productsNumber = productNames.length;

        await test.step('Add products to the cart from the Product Listing Page', async () => {
            for (const product of productNames) {
                await productListPage.addProductToCartFromPLP(product);
            }
        });

        await test.step('Validate that the cart badge displays the correct number of items', async () => {
            await expect(productListPage.shoppingCartBadge).toHaveText(String(productsNumber));
        });
    });

    test('Allows users to add products to the cart from the Product Detail Page (PDP)', async ({
        productListPage,
        productDetailPage,
        cartPage,
    }) => {
        await allure.severity('blocker');
        await allure.description('Ensures that a user can successfully add a product to the shopping cart from the Product Detail Page.');

        const productNames = products.map((product) => product.name);

        await test.step('Add products to the cart from their Product Detail Pages', async () => {
            for (const product of productNames) {
                await productListPage.clickOnProduct(product);
                await productDetailPage.clickAddToCartButton();
                await productDetailPage.clickBackToProductsButton();
            }
        });

        await test.step('Open the shopping cart', async () => {
            await productListPage.clickOnTheShoppingCart();
        });

        await test.step('Validate that all selected products are listed in the cart', async () => {
            const actualProductNames = await cartPage.getProductNames();
            expect(actualProductNames).toEqual(productNames);
        });
    });

    test('Allows users to remove products from the shopping cart', async ({ productListPage, cartPage }) => {
        await allure.severity('critical');
        await allure.description('Validates that a user can remove a previously added product from the shopping cart.');

        const productNames = products.map((product) => product.name);

        await test.step('Add products to the cart from the Product Listing Page', async () => {
            for (const product of productNames) {
                await productListPage.addProductToCartFromPLP(product);
            }
        });

        await test.step('Open the shopping cart', async () => {
            await productListPage.clickOnTheShoppingCart();
        });

        await test.step('Remove all products from the cart', async () => {
            for (const product of productNames) {
                await cartPage.deleteProductOnCart(product);
            }
        });

        await test.step('Validate that the shopping cart is empty', async () => {
            await expect(cartPage.cartItem).toHaveCount(0);
        });
    });
});
