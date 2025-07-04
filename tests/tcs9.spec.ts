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

  // 4. Add a product
  await menuSectionPage.switchMode("grid");
  await shopPage.addToCart("Beats Solo3 Wireless On-Ear");

  // 5. Go to the cart
  await menuSectionPage.navigateToCart();
  await expect(page).toHaveTitle(new RegExp("Cart"));

  await cartPage.updateOrderQuantity("Beats Solo3 Wireless On-Ear", "fill", 4);

  expect(
    await cartPage.getQuantityInputValue("Beats Solo3 Wireless On-Ear")
  ).toEqual(4);

  await cartPage.updateOrderQuantity("Beats Solo3 Wireless On-Ear", "click", 6);

  expect(
    await cartPage.getQuantityInputValue("Beats Solo3 Wireless On-Ear")
  ).toEqual(6);

  await cartPage.updateOrderQuantity("Beats Solo3 Wireless On-Ear", "click", 5);

  expect(
    await cartPage.getQuantityInputValue("Beats Solo3 Wireless On-Ear")
  ).toEqual(5);
});
