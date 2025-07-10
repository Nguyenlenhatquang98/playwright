import { test, expect } from "@utils/fixtures";

test("Ensure proper error handling when mandatory fields are blank", async ({
  page,
  pages,
}) => {
  const { shopPage, menuSectionPage, cartPage, checkoutPage } = pages;

  // Navigate to 'Shop' or 'Products' section
  await menuSectionPage.navigateToMenuItem("Shop");

  // Turn off Ad
  await expect(page).toHaveTitle(/Products/);
  await shopPage.turnOffAd();

  // Add a product to cart
  const randomProductName = await shopPage.getRandomProductName();

  shopPage.addToCart(randomProductName);

  // Click on Cart button
  await menuSectionPage.navigateToCart();
  await expect(page).toHaveTitle(new RegExp("Cart"));

  expect(await cartPage.getAllOrderText()).toEqual(randomProductName);

  // Proceed to complete order
  await cartPage.proceedToCheckout();

  await expect(page).toHaveTitle(new RegExp("Checkout"));

  expect(await checkoutPage.getAllOrderText()).toEqual(randomProductName);

  // 1. Leave mandatory fields (address, payment info) blank
  await checkoutPage.fillOrderInfomation("missing");

  //  2. Click 'Confirm Order'
  await checkoutPage.placeOrder();

  // 3. Verify error messages
  expect(await checkoutPage.verifyErrorMessage("missing")).toBe(true);
});
