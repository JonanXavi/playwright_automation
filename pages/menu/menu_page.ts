import { type Locator, type Page} from '@playwright/test';

export class MenuPage {
    readonly page: Page;
    readonly logoutOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutOption = page.getByTestId('logout-sidebar-link');
    }

    async clickOnTheLogoutOption() {
        await this.logoutOption.click();
    }
}