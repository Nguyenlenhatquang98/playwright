import { CommonSteps } from "@utils/commonSteps";
import { CommonUtils } from "@utils/commonUtils";
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

  expect(
    CommonUtils.normalizeLowerCase(await cartPage.getAllOrderText())
  ).toEqual(CommonUtils.normalizeLowerCase(randomProductName));

  // Proceed to complete order
  await cartPage.proceedToCheckout();

  await expect(page).toHaveTitle(new RegExp("Checkout"));

  expect(
    CommonUtils.normalizeLowerCase(await checkoutPage.getAllOrderText())
  ).toEqual(CommonUtils.normalizeLowerCase(randomProductName));

  // 1. Leave mandatory fields (address, payment info) blank
  await checkoutPage.fillOrderInformation("missing");

  //  2. Click 'Confirm Order'
  await checkoutPage.placeOrder();

  // 3. Verify error messages
  expect(await checkoutPage.getMissingFieldMessages("missing")).toEqual(
    await checkoutPage.getErrorMessageText()
  );
});
