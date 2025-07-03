import { test, expect } from "@utils/Fixtures";

test("Verify users can update quantity of product in cart", async ({
  page,
  pages,
}) => {
  const { shopPage, menuSectionPage, cartPage, checkoutPage } = pages;

  // 1. Open browser and go to https://demo.testarchitect.com/
  // 2. Login with valid credentials

  // 3. Go to Shop page
  await menuSectionPage.navigateToMenuItem("Shop");

  // Turn off Ad
  await expect(page).toHaveTitle(/Products/);
  await shopPage.turnOffAd();

  // 8. Select any item randomly to purchase
  // 9. Click 'Add to Cart'
  await menuSectionPage.switchMode("grid");
  await shopPage.addToCart("Beats Solo3 Wireless On-Ear");

  // // 10. Go to the cart

  await menuSectionPage.navigateToCart();
  await expect(page).toHaveTitle(new RegExp("Cart"));

  await cartPage.updateOrderQuantity("Beats Solo3 Wireless On-Ear", "fill", 4);
  await cartPage.updateOrderQuantity("Beats Solo3 Wireless On-Ear", "click", 6);
  await cartPage.updateOrderQuantity("Beats Solo3 Wireless On-Ear", "click", 5);

  await expect(page).toHaveTitle(new RegExp("Cart"));
});
