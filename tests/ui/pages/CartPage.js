import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.cartItems = page.locator('.cart_item');
  }

  async expectItemVisible(name) {
    await expect(this.page.locator('.cart_item').filter({ hasText: name })).toBeVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
