import { type Locator, type Page} from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartList = page.getByTestId('inventory-item');
    }

    async getProductNames() {
        return await this.cartList.getByTestId('inventory-item-name').allTextContents();
    }
}