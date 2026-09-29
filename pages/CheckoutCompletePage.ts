import { Page, expect } from '@playwright/test';

export class CheckoutCompletePage {
  private readonly confirmationMessage;

  constructor(private readonly page: Page) {
    this.confirmationMessage = this.page.getByText(
      'Thank you for your order!'
    );
  }

  async expectOrderCompleted() {
    await expect(this.confirmationMessage).toBeVisible();
  }
}