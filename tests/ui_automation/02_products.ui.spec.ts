import { test, expect } from '../../fixtures/base';
import { LoginPage } from '../../pages/login_page';
import { ENV } from '../../utils/env';
import products from '../../data/products.json';

test.describe('Validate the correct behavior of the products on the website', { tag: '@ui'}, () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(ENV.USER, ENV.PASSWORD);
    })

    test('Confirm that all products are properly displayed on the Product Listing Page (PLP)', async ({ productsPage }) => {
        const productsNames = products.map(product => product.name);
        const productsDetails = products.map(product => product.description);
        const productsPrices = products.map(product => product.price);
        const actualProductsNames = await productsPage.getProductsNames();
        const actualProductsDetails = await productsPage.getProductsDetails();
        const actualProductsPrices = await productsPage.getProductsPrices();

        await test.step('Verify that all available products are loaded and displayed correctly on the Product Listing Page (PLP)', async () => {
            expect.soft(actualProductsNames).toContain(productsNames);
            expect.soft(actualProductsDetails).toContain(productsDetails);
            expect.soft(actualProductsPrices).toContain(productsPrices);
        })
    })

    test('Confirm that product details are correctly displayed on the Product Detail Page (PDP)', async ({ productsPage }) => {
        const productsData = products;
        const productsNumber = productsData.length;

        for (let i = 0; i < productsNumber; i++) {
            await test.step(`Click on ${productsData[i].name} to open its Product Detail Page (PDP)`, async () => {
                await productsPage.clickOnProduct(productsData[i].name);
            })

            await test.step('Verify that the product name, description, and price match the expected values', async () => {
                const actualProductName = await productsPage.getProductName();
                const actualProductDetail = await productsPage.getProductDetail();
                const actualProductPrice = await productsPage.getProductPrice();

                expect.soft(actualProductName).toEqual(productsData[i].name);
                expect.soft(actualProductDetail).toEqual(productsData[i].description);
                expect.soft(actualProductPrice).toContain(productsData[i].price);
            })

            await test.step('Return to the Product Listing Page (PLP)', async () => {
                await productsPage.clickBackToProductsButton();
            })
        }
    })
});
