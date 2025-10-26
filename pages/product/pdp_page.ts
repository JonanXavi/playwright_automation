import { type Locator, type Page} from '@playwright/test';

export class ProductDetailPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productDetail: Locator;
    readonly productPrice: Locator;
    readonly addToCardBtn: Locator;
    readonly backToProductsBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.getByTestId('inventory-item-name');
        this.productDetail = page.getByTestId('inventory-item-desc');
        this.productPrice = page.getByTestId('inventory-item-price');
        this.addToCardBtn = page.getByRole('button', { name: 'Add to cart' });
        this.backToProductsBtn = page.getByRole('button', { name: 'Back to products' });
    }

    async getProductName() {
        return await this.productName.textContent();
    }

    async getProductDetail() {
        return await this.productDetail.textContent();
    }

    async getProductPrice() {
        return await this.productPrice.textContent();
    }

    async clickAddToCartButton() {
        await this.addToCardBtn.click();
    }

    async clickBackToProductsButton() {
        await this.backToProductsBtn.click();
    }
}