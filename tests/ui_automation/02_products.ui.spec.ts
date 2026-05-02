import { test, expect } from '../../fixtures/base';
import * as allure from 'allure-js-commons';
import { ENV } from '../../utils/env';
import products from '../../data/products.json';

test.describe('Products | Product listing and detail pages', { tag: '@ui' }, () => {
    test.beforeEach(async ({ authPage }) => {
        await allure.owner('Jonathan Fernández');
        await allure.tags('Products');

        await authPage.login(ENV.USER, ENV.PASSWORD);
    });

    test('Displays all available products correctly on the Product Listing Page (PLP)', async ({ productListPage }) => {
        await allure.severity('critical');
        await allure.description(
            'Verifies that all available products are correctly displayed on the Product Listing Page, including name, price, and image.'
        );

        const productsNames = products.map((product) => product.name);
        const productsDetails = products.map((product) => product.description);
        const productsPrices = products.map((product) => product.price);
        const actualProductsNames = await productListPage.getProductsNames();
        const actualProductsDetails = await productListPage.getProductsDetails();
        const actualProductsPrices = await productListPage.getProductsPrices();

        await test.step('Validate that all product names are displayed correctly', async () => {
            expect(actualProductsNames).toEqual(productsNames);
        });

        await test.step('Validate that all product descriptions are displayed correctly', async () => {
            expect(actualProductsDetails).toEqual(productsDetails);
        });

        await test.step('Validate that all product prices are displayed correctly', async () => {
            expect(actualProductsPrices).toEqual(productsPrices);
        });
    });

    test('Displays correct product information on the Product Detail Page (PDP)', async ({ productListPage, productDetailPage }) => {
        await allure.severity('critical');
        await allure.description(
            'Validates that the Product Detail Page shows accurate product information such as name, description, price, and image.'
        );

        const productsData = products;
        const productsNumber = productsData.length;

        for (let i = 0; i < productsNumber; i++) {
            await test.step(`Open the Product Detail Page for "${productsData[i].name}"`, async () => {
                await productListPage.clickOnProduct(productsData[i].name);
            });

            await test.step('Validate that the product name, description, and price are correct', async () => {
                const actualProductName = await productDetailPage.getProductName();
                const actualProductDetail = await productDetailPage.getProductDetail();
                const actualProductPrice = await productDetailPage.getProductPrice();

                expect(actualProductName).toEqual(productsData[i].name);
                expect(actualProductDetail).toEqual(productsData[i].description);
                expect(actualProductPrice).toEqual(productsData[i].price);
            });

            await test.step('Navigate back to the Product Listing Page', async () => {
                await productDetailPage.clickBackToProductsButton();
            });
        }
    });
});
