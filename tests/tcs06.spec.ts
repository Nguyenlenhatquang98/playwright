import { CommonUtils } from "@utils/commonUtils";
import { test, expect } from "@utils/fixtures";

test.use({ needsLogin: false });

test("Verify users try to buy an item without logging in (As a guest)", async ({
  page,
  pages,
}) => {
  const { shopPage, menuSectionPage, cartPage, checkoutPage } = pages;

  // 2. Navigate to 'Shop' or 'Products' section
  await menuSectionPage.navigateToMenuItem("Shop");
  await expect(page).toHaveTitle(/Products/);

  // 3. Add a product to cart
  const randomProductName = await shopPage.getRandomProductName();

  shopPage.addToCart(randomProductName);

  // 4. Click on Cart button
  await menuSectionPage.navigateToCart();
  await expect(page).toHaveTitle(new RegExp("Cart"));

  expect(
    CommonUtils.normalizeLowerCase(await cartPage.getAllOrderText())
  ).toEqual(CommonUtils.normalizeLowerCase(randomProductName));

  // 5. Proceed to complete order
  await cartPage.proceedToCheckout();

  await expect(page).toHaveTitle(new RegExp("Checkout"));

  expect(
    CommonUtils.normalizeLowerCase(await checkoutPage.getAllOrderText())
  ).toEqual(CommonUtils.normalizeLowerCase(randomProductName));

  await checkoutPage.fillOrderInformation("full");

  await checkoutPage.placeOrder();

  await expect(page).toHaveTitle(new RegExp("Checkout"));

  const addressText = await checkoutPage.successConfirmMessage.innerText();
  expect(addressText).toEqual("THANK YOU. YOUR ORDER HAS BEEN RECEIVED.");
});
