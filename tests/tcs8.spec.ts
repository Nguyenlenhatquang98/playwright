import { test, expect } from "@utils/fixtures";

test("Verify users can clear the cart", async ({ page, pages }) => {
  const { shopPage, menuSectionPage, cartPage, checkoutPage } = pages;

  // Open browser and go to url
  // 2. Login with valid credentials

  // Go to Shop page
  await menuSectionPage.navigateToMenuItem("Shop");

  // Turn off Ad
  await expect(page).toHaveTitle(/Products/);
  await shopPage.turnOffAd();

  // Select any item randomly to purchase
  // Click 'Add to Cart'
  await shopPage.addToCart([
    "Beats Solo3 Wireless On-Ear",
    "Beats Studio Wireless Over-Ear",
  ]);

  // 3. Go to the cart

  await menuSectionPage.navigateToCart();
  await expect(page).toHaveTitle(new RegExp("Cart"));

  //  4. Verify items show in table
  expect(
    await cartPage.verifyItemDetailsOrderInCartPage([
      "Beats Solo3 Wireless On-Ear",
      "Beats Studio Wireless Over-Ear",
    ])
  ).toBe(true);

  // 5. Click on Clear shopping cart
  await cartPage.clearOrderItems();

  // 6. Verify empty cart page displays
  expect(cartPage.emptyShoppingCartText).toBeVisible();
});
