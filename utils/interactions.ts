import { type Locator, type Page} from '@playwright/test';

export const clickOnButton = async (page: Page, button: string) => {
    await page.getByRole('button', { name: button }).click();
}