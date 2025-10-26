import { test as base } from '@playwright/test';
import { ENV } from '../utils/env';
import { AuthPage } from '../pages/auth/auth_page';
import { MenuPage } from "../pages/menu/menu_page";
import { ProductListPage } from "../pages/product/plp_page";
import { ProductDetailPage } from "../pages/product/pdp_page";
import { CartPage } from '../pages/cart/cart_page';
import { CheckoutPage } from '../pages/checkout/checkout_page';

interface User {
    username: string;
    password: string;
}

type BaseFixtures = {
    testUser: User;
    authPage: AuthPage;
    menuPage: MenuPage;
    productListPage: ProductListPage;
    productDetailPage: ProductDetailPage;
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

    authPage: async ({ page }, use) => {
        await use(new AuthPage(page));
    },

    menuPage: async ({ page }, use) => {
        await use(new MenuPage(page));
    },

    productListPage: async ({ page }, use) => {
        await use(new ProductListPage(page));
    },

    productDetailPage: async ({ page }, use) => {
        await use(new ProductDetailPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
});

export { expect } from '@playwright/test';