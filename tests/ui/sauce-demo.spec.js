import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { InventoryPage } from './pages/InventoryPage.js';
import { CartPage } from './pages/CartPage.js';
import { CheckoutPage } from './pages/CheckoutPage.js';

const credentials = {
  validUser: 'standard_user',
  password: 'secret_sauce',
  lockedUser: 'locked_out_user'
};

test.describe('Sauce Demo - Authentication', () => {
  test('valid user can log in @smoke @regression', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login(credentials.validUser, credentials.password);

    await expect(page).toHaveURL(/inventory.html/);
    await inventory.expectLoaded();
  });

  test('locked user receives a clear error message @regression', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(credentials.lockedUser, credentials.password);

    await login.expectLoginError('Sorry, this user has been locked out.');
  });
});

test.describe('Sauce Demo - Shopping flow', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(credentials.validUser, credentials.password);
  });

  test('user can add and remove a product from cart @smoke @regression', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.addProduct('Sauce Labs Backpack');
    await inventory.expectCartCount(1);

    await inventory.removeProduct('Sauce Labs Backpack');
    await inventory.expectCartCount(0);
  });

  test('user can complete checkout successfully @smoke @regression', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addProduct('Sauce Labs Backpack');
    await inventory.openCart();

    await cart.expectItemVisible('Sauce Labs Backpack');
    await cart.checkout();

    await checkout.completeCustomerDetails('Dhamini', 'QA', '98500');
    await checkout.finishOrder();
    await checkout.expectOrderComplete();
  });

  test('inventory can be sorted by price low to high @regression', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.sortBy('lohi');

    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(price => Number(price.replace('$', '')));

    expect(numericPrices).toEqual([...numericPrices].sort((a, b) => a - b));
  });
 test('test multiple product addition to cart and deletion @regression', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await inventory.addMultipleProducts([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt'
  ]);

  await inventory.expectCartCount(3);

  await inventory.openCart();

  await inventory.removeMultipleProduct([
    '#remove-sauce-labs-bolt-t-shirt',
    '#remove-sauce-labs-bike-light',
    '#remove-sauce-labs-backpack'
  ]);

  await inventory.expectCartCount(0);
});
});
