import { test as base } from '@playwright/test';
import { ENV } from '../utils/env';
import { LoginPage } from '../pages/login_page';
import { ProductsPage } from '../pages/products_page';
import { CartPage } from '../pages/cart_page';
import { CheckoutPage } from '../pages/checkout_page';

interface User {
    username: string;
    password: string;
}

type BaseFixtures = {
    testUser: User;
    loginPage: LoginPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
};

export const test = base.extend<BaseFixtures>({
    testUser: [
        async ({}, use) => {
            await use({
                username: ENV.USER,
                password: ENV.PASSWORD
            });
        },
        { option: true }
    ],

    page: async ({ page }, use) => {
        await page.goto('/');
        await use(page);
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
});

export { expect } from '@playwright/test';