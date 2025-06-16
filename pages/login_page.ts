import { type Locator, type Page} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly logo: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByText('Swag Labs');
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByTestId('error');
    }

    async isLogoVisible() {
        return await this.logo.isVisible();
    }

    async typeUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async typePassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginBtn.click();
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