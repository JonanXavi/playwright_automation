import { type Locator, type Page} from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly orderHeaderText: Locator;
    readonly orderMessageText: Locator;
    readonly checkoutBtn: Locator;
    readonly continueBtn: Locator;
    readonly finishBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.zipCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.orderHeaderText = page.getByTestId('complete-header');
        this.orderMessageText = page.getByTestId('complete-text');
        this.checkoutBtn = page.getByRole('button', { name: 'checkout' });
        this.continueBtn = page.getByRole('button', { name: 'continue' });
        this.finishBtn = page.getByRole('button', { name: 'finish' });
    }

    async clickCheckoutButton() {
        await this.checkoutBtn.click();
    }

    async typeFirstName(name: string) {
        await this.firstNameInput.fill(name);
    }

    async typeLastName(lastname: string) {
        await this.lastNameInput.fill(lastname);
    }

    async typeZipCode(zip: string) {
        await this.zipCodeInput.fill(zip);
    }

    async clickContinueButton() {
        await this.continueBtn.click();
    }

    async clickFinishButton() {
        await this.finishBtn.click();
    }

    async getOrderHeaderText() {
        return await this.orderHeaderText.textContent();
    }

    async getOrderMessageText() {
        return await this.orderMessageText.textContent();
    }
}