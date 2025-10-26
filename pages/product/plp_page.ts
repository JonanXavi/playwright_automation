import { type Locator, type Page} from '@playwright/test';

export class ProductListPage {
    readonly page: Page;
    readonly menuBtn: Locator;
    readonly shoppingCartBtn: Locator;
    readonly shoppingCartBadge: Locator;
    readonly productsHeader: Locator;
    readonly productDescription: Locator;
    readonly productName: Locator;
    readonly productDetail: Locator;
    readonly productPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuBtn = page.getByRole('button', { name: 'Open Menu' });
        this.shoppingCartBtn = page.getByTestId('shopping-cart-link');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
        this.productsHeader = page.getByTestId('title');
        this.productDescription = page.getByTestId('inventory-item-description');
        this.productName = page.getByTestId('inventory-item-name');
        this.productDetail = page.getByTestId('inventory-item-desc');
        this.productPrice = page.getByTestId('inventory-item-price');
    }

    async clickOnTheMenuButton() {
        await this.menuBtn.click();
    }

    async clickOnTheShoppingCart() {
        await this.shoppingCartBtn.click();
    }

    async getProductsTitle() {
        return await this.productsHeader.textContent();
    }

    async clickOnProduct(product: string) {
        await this.productName.filter({ hasText: product }).click();
    }

    async addProductToCartFromPLP(product: string) {
        await this.productDescription.filter({ hasText: product }).getByRole('button', { name: 'Add to cart' }).click();
    }

    async getProductsNames() {
        return await this.productName.allTextContents();
    }

    async getProductsDetails() {
        return await this.productDetail.allTextContents();
    }

    async getProductsPrices() {
        return await this.productPrice.allTextContents();
    }
}