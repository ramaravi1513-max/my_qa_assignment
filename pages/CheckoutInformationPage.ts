import { Page, expect } from '@playwright/test';

export class CheckoutInformationPage {
  private readonly checkoutInformationTitle;
  private readonly firstNameInput;
  private readonly lastNameInput;
  private readonly postalCodeInput;
  private readonly continueButton;

  constructor(private readonly page: Page) {
    this.checkoutInformationTitle = this.page.locator('.title');

    this.firstNameInput = this.page.getByRole('textbox', {
      name: 'First Name',
    });

    this.lastNameInput = this.page.getByRole('textbox', {
      name: 'Last Name',
    });

    this.postalCodeInput = this.page.getByRole('textbox', {
      name: 'Zip/Postal Code',
    });

    this.continueButton = this.page.getByRole('button', {
      name: 'Continue',
    });
  }

  async expectCheckoutInformationPageLoaded() {
    await expect(this.checkoutInformationTitle).toHaveText(
      'Checkout: Your Information'
    );
  }

  async fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}

