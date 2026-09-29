import { Page, expect } from '@playwright/test';

export class CommonMethods {
  constructor(private page: Page) {}

  async waitForUrl(urlPattern: RegExp) {
    await expect(this.page).toHaveURL(urlPattern);
  }

  async getText(locator: string) {
    return await this.page.locator(locator).innerText();
  }

  async reloadPage() {
    await this.page.reload();
  }
}