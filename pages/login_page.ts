import { type Locator, type Page} from '@playwright/test';
import { clickOnButton } from '../utils/interactions';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.errorMessage = page.getByTestId('error');
    }

    async typeUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async typePassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await clickOnButton(this.page, 'Login');
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async login(username: string, password: string) {
        await this.typeUsername(username);
        await this.typePassword(password);
        await this.clickLoginButton();
    }
}