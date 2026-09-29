import { Page, expect } from '@playwright/test';

export class CartPage {
  private readonly cartPageTitle;
  private readonly checkoutButton;

  constructor(private readonly page: Page) {
    this.cartPageTitle = this.page.locator('.title');

    this.checkoutButton = this.page.getByRole('button', {
      name: 'Checkout',
    });
  }

  async expectCartPageLoaded() {
    await expect(this.cartPageTitle).toHaveText('Your Cart');
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}