import { type Locator, type Page} from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly menuBtn: Locator;
    readonly logoutOption: Locator;
    readonly productsHeader: Locator;
    readonly shoppingCartBtn: Locator;
    readonly shoppingCartBadge: Locator;
    readonly productDescription: Locator;
    readonly productName: Locator;
    readonly productDetail: Locator;
    readonly productPrice: Locator;
    readonly addToCardBtn: Locator;
    readonly backToProductsBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuBtn = page.getByRole('button', { name: 'Open Menu' });
        this.logoutOption = page.getByTestId('logout-sidebar-link');
        this.productsHeader = page.getByTestId('title');
        this.shoppingCartBtn = page.getByTestId('shopping-cart-link');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
        this.productDescription = page.getByTestId('inventory-item-description');
        this.productName = page.getByTestId('inventory-item-name');
        this.productDetail = page.getByTestId('inventory-item-desc');
        this.productPrice = page.getByTestId('inventory-item-price');
        this.addToCardBtn = page.getByRole('button', { name: 'Add to cart' });
        this.backToProductsBtn = page.getByRole('button', { name: 'Back to products' });
    }

    async getProductsTitle() {
        return await this.productsHeader.textContent();
    }

    async clickOnTheMenuButton() {
        await this.menuBtn.click();
    }

    async clickOnTheLogoutOption() {
        await this.logoutOption.click();
    }

    async clickOnTheShoppingCart() {
        await this.shoppingCartBtn.click();
    }

    async clickAddToCartButton() {
        await this.addToCardBtn.click();
    }

    async clickBackToProductsButton() {
        await this.backToProductsBtn.click();
    }

    async addProductToCartFromPLP(product: string) {
        await this.productDescription.filter({ hasText: product }).getByRole('button', { name: 'Add to cart' }).click();
    }

    async clickOnProduct(product: string) {
        await this.productName.filter({ hasText: product }).click();
    }

    async getProductsNames() {
        return await this.productName.allTextContents();
    }

    async getProductName() {
        return await this.productName.textContent();
    }

    async getProductsDetails() {
        return await this.productDetail.allTextContents();
    }

    async getProductDetail() {
        return await this.productDetail.textContent();
    }

    async getProductsPrices() {
        return await this.productPrice.allTextContents();
    }

    async getProductPrice() {
        return await this.productPrice.textContent();
    }
}