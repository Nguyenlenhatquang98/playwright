import { test, expect } from "@utils/fixtures";
import customerInfo from "@data/checkoutInfo.json";

test("Verify orders appear in order history", async ({ page, pages }) => {
  const { shopPage, menuSectionPage, cartPage, checkoutPage, myAccountPage } =
    pages;

  await menuSectionPage.navigateToMenuItem("Shop");

  await expect(page).toHaveTitle(/Products/);
  await shopPage.turnOffAd();

  await shopPage.addToCart([
    "Beats Solo3 Wireless On-Ear",
    "Beats Studio Wireless Over-Ear",
  ]);

  await menuSectionPage.navigateToCart();
  await expect(page).toHaveTitle(new RegExp("Cart"));

  expect(
    await cartPage.verifyItemDetailsOrderInCartPage([
      "Beats Solo3 Wireless On-Ear",
      "Beats Studio Wireless Over-Ear",
    ])
  ).toBe(true);

  await cartPage.proceedToCheckout();

  await expect(page).toHaveTitle(new RegExp("Checkout"));

  expect(
    await checkoutPage.verifyItemDetailsOrderInCheckoutPage([
      "Beats Solo3 Wireless On-Ear",
      "Beats Studio Wireless Over-Ear",
    ])
  ).toBe(true);

  await checkoutPage.fillOrderInfomation("full");

  await checkoutPage.placeOrder();

  await expect(page).toHaveTitle(new RegExp("Checkout"));

  const orderId = await checkoutPage.orderNumber.textContent();

  // 1. Go to My Account page
  await menuSectionPage.navigateToMyAccount();
  await expect(page).toHaveTitle(/My Account/);

  // 2. Click on Orders in left navigation
  await myAccountPage.navigateToOrders();
  await myAccountPage.viewOrder(orderId);

  // 3. Verify order details
  expect(
    await myAccountPage.verifyItemDetailsOrderInOrderPage([
      "Beats Solo3 Wireless On-Ear",
      "Beats Studio Wireless Over-Ear",
    ])
  ).toBe(true);

  const addressText = await myAccountPage.billingAddressDetails.innerText();
  const normalized = addressText.replace(/\s+/g, " ").trim();
  expect(normalized).toContain(customerInfo.full.firstname);
  expect(normalized).toContain(customerInfo.full.lastname);
  expect(normalized).toContain(customerInfo.full.city);
  expect(normalized).toContain(customerInfo.full.phonenumber);
  expect(normalized).toContain(customerInfo.full.email);
});
