import { Page, expect } from '@playwright/test';

export class ProductsPage {
  private readonly productPageTitle;
  private readonly sortDropdown;
  private readonly addToCartButtons;
  private readonly cartBadge;
  private readonly cartLink;
  private readonly productPrices;

  constructor(private readonly page: Page) {
    this.productPageTitle = this.page.locator('.title');

    this.sortDropdown = this.page.getByRole('combobox', {
      name: /sort/i,
    });

    this.addToCartButtons = this.page.getByRole('button', {
      name: /Add to cart/i,
    });

    this.cartBadge = this.page.locator('.shopping_cart_badge');

    this.cartLink = this.page.locator(
      '[data-test="shopping-cart-link"]'
    );

    this.productPrices = this.page.locator(
      '.inventory_item_price'
    );
  }

  async expectProductPageLoaded() {
    await expect(this.productPageTitle).toHaveText('Products');
  }

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
  }

  async addProducts(count: number) {
    for (let i = 0; i < count; i++) {
      await this.addToCartButtons.nth(i).click();
    }
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.productPrices.allInnerTexts();

    return priceTexts.map((price) =>
      Number(price.replace('$', ''))
    );
  }

  async getFirstProductPrice(): Promise<number> {
    const priceText =
      await this.productPrices.first().innerText();

    return Number(priceText.replace('$', ''));
  }

  async expectCartCount(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async openCart() {
    await this.cartLink.click();
  }
}