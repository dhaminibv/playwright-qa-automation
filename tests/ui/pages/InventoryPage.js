import { expect } from '@playwright/test';

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByText('Products');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async expectLoaded() {
    await expect(this.title).toBeVisible();
  }

  product(name) {
    return this.page.locator('.inventory_item').filter({ hasText: name });
  }

  async addProduct(name) {
    await this.product(name).getByRole('button', { name: /Add to cart/i }).click();
  }

  async removeProduct(name) {
    await this.product(name).getByRole('button', { name: /Remove/i }).click();
  }

  async sortBy(value) {
    await this.sortDropdown.selectOption(value);
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectCartCount(count) {
    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }
}
