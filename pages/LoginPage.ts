import { Page, expect } from '@playwright/test';

export class LoginPage {
  private readonly usernameInput;
  private readonly passwordInput;
  private readonly loginButton;
  private readonly errorMessage;

  constructor(private readonly page: Page) {
    this.usernameInput = this.page.getByRole('textbox', {
      name: 'Username',
    });

    this.passwordInput = this.page.getByRole('textbox', {
      name: 'Password',
    });

    this.loginButton = this.page.getByRole('button', {
      name: 'Login',
    });

    this.errorMessage = this.page.getByText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }

  async expectLoginPageLoaded() {
    await expect(this.loginButton).toBeVisible();
  }
}