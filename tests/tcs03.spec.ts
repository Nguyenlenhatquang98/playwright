import { CommonUtils } from "@utils/commonUtils";
import { test, expect } from "@utils/fixtures";

test("Verify users can buy an item using different payment methods (all payment methods)", async ({
  page,
  pages,
}) => {
  const { menuSectionPage, cartPage, checkoutPage, shopPage } = pages;

  // 1. Open browser and go to url
  // 2. Login with valid credentials

  // 3. Go to Shop page
  await menuSectionPage.navigateToMenuItem("Shop");
  await expect(page).toHaveTitle(/Products/);

  // 8. Select any item randomly to purchase
  // 9. Click 'Add to Cart'
  const randomProductName = await shopPage.getRandomProductName();

  shopPage.addToCart(randomProductName);

  // 10. Go to the cart

  await menuSectionPage.navigateToCart();
  await expect(page).toHaveTitle(new RegExp("Cart"));

  // 11. Verify item details in mini content
  expect(
    CommonUtils.normalizeLowerCase(await cartPage.getAllOrderText())
  ).toEqual(CommonUtils.normalizeLowerCase(randomProductName));

  // 12. Click on Checkout
  await cartPage.proceedToCheckout();

  // 13. Verify Checkout page displays
  await expect(page).toHaveTitle(new RegExp("Checkout"));

  // 14. Verify item details in order
  expect(
    CommonUtils.normalizeLowerCase(await checkoutPage.getAllOrderText())
  ).toEqual(CommonUtils.normalizeLowerCase(randomProductName));

  // chose method
  await checkoutPage.choosePayMethod("Cash on delivery");

  // 15. Fill the billing details with default payment method
  await checkoutPage.fillOrderInformation("full");

  // 16. Click on PLACE ORDER
  await checkoutPage.placeOrder();

  // 17. Verify Order status page displays
  await expect(page).toHaveTitle(new RegExp("Checkout"));

  // 18. Verify the Order details with billing and item information
  const addressText = await checkoutPage.paymentMethod.textContent();
  expect(addressText).toEqual("Cash on delivery");
});
