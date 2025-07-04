import { test, expect } from "@utils/Fixtures";

test.use({ needsLogin: false });

test("Verify users try to buy an item without logging in (As a guest)", async ({
  page,
  pages,
}) => {
  const { shopPage, menuSectionPage, cartPage, checkoutPage } = pages;

  // 2. Navigate to 'Shop' or 'Products' section
  await menuSectionPage.navigateToMenuItem("Shop");

  // Turn off Ad
  await expect(page).toHaveTitle(/Products/);
  await shopPage.turnOffAd();

  // 3. Add a product to cart
  await shopPage.addToCart("Beats Solo3 Wireless On-Ear");

  // 4. Click on Cart button
  await menuSectionPage.navigateToCart();
  await expect(page).toHaveTitle(new RegExp("Cart"));

  expect(
    await cartPage.verifyItemDetailsOrderInCartPage(
      "Beats Solo3 Wireless On-Ear"
    )
  ).toBe(true);

  // 5. Proceed to complete order
  await cartPage.proceedToCheckout();

  await expect(page).toHaveTitle(new RegExp("Checkout"));

  expect(
    await checkoutPage.verifyItemDetailsOrderInCheckoutPage(
      "Beats Solo3 Wireless On-Ear"
    )
  ).toBe(true);

  await checkoutPage.fillOrderInfomation("full");

  await checkoutPage.placeOrder();

  await expect(page).toHaveTitle(new RegExp("Checkout"));

  const addressText = await checkoutPage.successConfirmMessage.innerText();
  expect(addressText).toEqual("THANK YOU. YOUR ORDER HAS BEEN RECEIVED.");
});
