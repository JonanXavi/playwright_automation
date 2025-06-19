import { type Locator, type Page} from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItem = page.getByTestId('inventory-item');
    }

    async getProductNames() {
        return await this.cartItem.getByTestId('inventory-item-name').allTextContents();
    }

    async deleteProductOnCart(product: string) {
        await this.cartItem.filter({ hasText: product }).getByRole('button', { name: 'Remove' }).click();
    }
}