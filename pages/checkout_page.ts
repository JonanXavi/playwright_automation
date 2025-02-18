import { type Locator, type Page} from '@playwright/test';
import { clickOnButton } from '../utils/interactions';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly orderHeaderText: Locator;
    readonly orderMessageText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.zipCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.orderHeaderText = page.getByTestId('complete-header');
        this.orderMessageText = page.getByTestId('complete-text');
    }

    async clickCheckoutButton() {
        await clickOnButton(this.page, 'checkout');
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
        await clickOnButton(this.page, 'continue');
    }

    async clickFinishButton() {
        await clickOnButton(this.page, 'finish');
    }

    async getOrderHeaderText() {
        return await this.orderHeaderText.textContent();
    }

    async getOrderMessageText() {
        return await this.orderMessageText.textContent();
    }
}