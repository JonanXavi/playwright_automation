import { test, expect } from '../../fixtures/base';
import { AuthPage } from "../../pages/auth/auth_page";
import { ENV } from '../../utils/env';
import products from '../../data/products.json';

test.describe('Validate the correct behavior of the products on the website', { tag: '@ui'}, () => {
    test.beforeEach(async ({ page }) => {
        const authPage = new AuthPage(page);
        await authPage.login(ENV.USER, ENV.PASSWORD);
    })

    test('Confirm that all products are properly displayed on the Product Listing Page (PLP)', async ({ productListPage }) => {
        const productsNames = products.map(product => product.name);
        const productsDetails = products.map(product => product.description);
        const productsPrices = products.map(product => product.price);
        const actualProductsNames = await productListPage.getProductsNames();
        const actualProductsDetails = await productListPage.getProductsDetails();
        const actualProductsPrices = await productListPage.getProductsPrices();

        await test.step('Verify that all available products are loaded and displayed correctly on the Product Listing Page (PLP)', async () => {
            expect.soft(actualProductsNames).toContain(productsNames);
            expect.soft(actualProductsDetails).toContain(productsDetails);
            expect.soft(actualProductsPrices).toContain(productsPrices);
        })
    })

    test('Confirm that product details are correctly displayed on the Product Detail Page (PDP)', async ({ productListPage, productDetailPage }) => {
        const productsData = products;
        const productsNumber = productsData.length;

        for (let i = 0; i < productsNumber; i++) {
            await test.step(`Click on ${productsData[i].name} to open its Product Detail Page (PDP)`, async () => {
                await productListPage.clickOnProduct(productsData[i].name);
            })

            await test.step('Verify that the product name, description, and price match the expected values', async () => {
                const actualProductName = await productDetailPage.getProductName();
                const actualProductDetail = await productDetailPage.getProductDetail();
                const actualProductPrice = await productDetailPage.getProductPrice();

                expect.soft(actualProductName).toEqual(productsData[i].name);
                expect.soft(actualProductDetail).toEqual(productsData[i].description);
                expect.soft(actualProductPrice).toContain(productsData[i].price);
            })

            await test.step('Return to the Product Listing Page (PLP)', async () => {
                await productDetailPage.clickBackToProductsButton();
            })
        }
    })
});