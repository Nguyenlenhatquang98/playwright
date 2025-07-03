import { test, expect } from "@utils/Fixtures";

test("Verify users can buy an item using different payment methods (all payment methods)", async ({
  page,
  pages,
}) => {
  const { menuSectionPage, cartPage, checkoutPage, shopPage } = pages;

  // 1. Open browser and go to https://demo.testarchitect.com/
  // 2. Login with valid credentials

  // 3. Go to Shop page
  await menuSectionPage.navigateToMenuItem("Shop");

  // Turn off Ad
  await expect(page).toHaveTitle(/Products/);
  await shopPage.turnOffAd();

  // 8. Select any item randomly to purchase
  // 9. Click 'Add to Cart'
  await shopPage.addToCart("Beats Solo3 Wireless On-Ear");

  // 10. Go to the cart

  await menuSectionPage.navigateToCart();
  await expect(page).toHaveTitle(new RegExp("Cart"));

  // 11. Verify item details in mini content
  expect(
    await cartPage.verifyItemDetailsOrderInCartPage(
      "Beats Solo3 Wireless On-Ear"
    )
  ).toBe(true);

  // 12. Click on Checkout
  await cartPage.proceedToCheckout();

  // 13. Verify Checkbout page displays
  await expect(page).toHaveTitle(new RegExp("Checkout"));

  // 14. Verify item details in order
  expect(
    await checkoutPage.verifyItemDetailsOrderInCheckoutPage(
      "Beats Solo3 Wireless On-Ear"
    )
  ).toBe(true);

  // chose method

  await checkoutPage.choosePayMethod("Cash on delivery");

  // 15. Fill the billing details with default payment method
  await checkoutPage.fillOrderInfomation("full");

  // 16. Click on PLACE ORDER
  await checkoutPage.placeOrder();

  // 17. Verify Order status page displays
  await expect(page).toHaveTitle(new RegExp("Checkout"));

  // 18. Verify the Order details with billing and item information
  const addressText = await checkoutPage.paymentMethod.textContent();
  expect(addressText).toEqual("Cash on delivery");
});
