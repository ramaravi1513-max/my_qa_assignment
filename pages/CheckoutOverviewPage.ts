import { Page, expect } from '@playwright/test';

export class CheckoutOverviewPage {
  private readonly overviewPageTitle;
  private readonly finishButton;

  constructor(private readonly page: Page) {
    this.overviewPageTitle = this.page.locator('.title');

    this.finishButton = this.page.getByRole('button', {
      name: 'Finish',
    });
  }

  async expectOverviewPageLoaded() {
    await expect(this.overviewPageTitle).toHaveText(
      'Checkout: Overview'
    );
  }

  async clickFinish() {
    await this.finishButton.click();
  }
}

