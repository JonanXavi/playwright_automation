import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly orderHeaderText: Locator;
    readonly orderMessageText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.zipCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'continue' });
        this.finishButton = page.getByRole('button', { name: 'finish' });
        this.orderHeaderText = page.getByTestId('complete-header');
        this.orderMessageText = page.getByTestId('complete-text');
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
        await this.continueButton.click();
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }

    async getOrderHeaderText() {
        return await this.orderHeaderText.textContent();
    }

    async getOrderMessageText() {
        return await this.orderMessageText.textContent();
    }
}
