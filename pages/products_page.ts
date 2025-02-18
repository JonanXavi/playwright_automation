import { type Locator, type Page} from '@playwright/test';
import { clickOnButton } from '../utils/interactions';

export class ProductsPage {
    readonly page: Page;
    readonly productsHeader: Locator;
    readonly shoppingCartBtn: Locator;
    readonly shoppingCartBadge: Locator;
    readonly productDescription: Locator;
    readonly productName: Locator;
    readonly productDetail: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsHeader = page.getByTestId('title');
        this.shoppingCartBtn = page.getByTestId('shopping-cart-link');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
        this.productDescription = page.getByTestId('inventory-item-description');
        this.productName = page.getByTestId('inventory-item-name');
        this.productDetail = page.getByTestId('inventory-item-desc');
    }

    async getProductsTitle() {
        return await this.productsHeader.textContent();
    }

    async clickOnTheShoppingCart() {
        await this.shoppingCartBtn.click();
    }

    async clickAddToCartButton() {
        await clickOnButton(this.page, 'Add to cart');
    }

    async clickBackToProductsButton() {
        await clickOnButton(this.page, 'Back to products');
    }

    async addProductToCartFromPLP(product: string) {
        await this.productDescription.filter({ hasText: product }).getByRole('button', { name: 'Add to cart' }).click();
    }

    async clickOnProduct(product: string) {
        await this.productName.filter({ hasText: product }).click();
    }

    async getProductNames() {
        return await this.productName.allTextContents();
    }

    async getProductDetails() {
        return await this.productDetail.allTextContents();
    }
}