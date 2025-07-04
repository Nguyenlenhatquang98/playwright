import { test, expect } from "@utils/Fixtures";

test("Verify users can clear the cart", async ({ page, pages }) => {
  const { shopPage, menuSectionPage, cartPage, checkoutPage } = pages;

  // 1. Open browser and go to https://demo.testarchitect.com/

  // 3. Go to Shop page
  await menuSectionPage.navigateToMenuItem("Shop");

  // Turn off Ad
  await expect(page).toHaveTitle(/Products/);
  await shopPage.turnOffAd();

  // 8. Select any item randomly to purchase
  // 9. Click 'Add to Cart'
  await menuSectionPage.switchMode("grid");
  await shopPage.addToCart([
    "Beats Solo3 Wireless On-Ear",
    "Beats Studio Wireless Over-Ear",
  ]);

  // // 10. Go to the cart

  await menuSectionPage.navigateToCart();
  await expect(page).toHaveTitle(new RegExp("Cart"));

  // 11. Verify item details in mini content
  expect(
    await cartPage.verifyItemDetailsOrderInCartPage([
      "Beats Solo3 Wireless On-Ear",
      "Beats Studio Wireless Over-Ear",
    ])
  ).toBe(true);

  await cartPage.clearOrderItems();

  expect(cartPage.emptyShoppingCartText).toBeVisible();
});
