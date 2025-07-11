import { test, expect } from "@utils/fixtures";
import customerInfo from "@data/checkoutInfo.json";
import { CommonUtils } from "@utils/commonUtils";
import { CommonSteps } from "@utils/commonSteps";

test("Verify orders appear in order history", async ({ page, pages }) => {
  const { shopPage, menuSectionPage, cartPage, checkoutPage, myAccountPage } =
    pages;

  await menuSectionPage.navigateToMenuItem("Shop");

  await expect(page).toHaveTitle(/Products/);
  await shopPage.turnOffAd();

  const randomProductName = await shopPage.getRandomProductName(2);

  shopPage.addToCart(randomProductName);

  await menuSectionPage.navigateToCart();
  await expect(page).toHaveTitle(new RegExp("Cart"));

  expect(await cartPage.getAllOrderText()).toEqual(randomProductName);

  await cartPage.proceedToCheckout();

  await expect(page).toHaveTitle(new RegExp("Checkout"));

  expect(
    CommonUtils.normalizeLowerCase(await checkoutPage.getAllOrderText())
  ).toEqual(CommonUtils.normalizeLowerCase(randomProductName));

  await checkoutPage.fillOrderInformation("full");

  await checkoutPage.placeOrder();

  await expect(page).toHaveTitle(new RegExp("Checkout"));

  // const orderId = await checkoutPage.orderNumber.textContent();
  const orderOverview = await checkoutPage.getOrderOverview();

  console.log("Order data after checkout: " + JSON.stringify(orderOverview));

  // 1. Go to My Account page
  await menuSectionPage.navigateToMyAccount();
  await expect(page).toHaveTitle(/My Account/);

  // 2. Click on Orders in left navigation
  await myAccountPage.navigateToOrders();

  const orderHistory = await myAccountPage.getOrderInfoById(
    orderOverview.order
  );

  console.log("Order data in MyAccount page: " + JSON.stringify(orderHistory));
  expect(orderHistory.order).toEqual(`#${orderOverview.order}`);
  expect(orderHistory.date).toEqual(orderOverview.date);
  expect(orderHistory.total).toContain(orderOverview.total);

  await myAccountPage.viewOrder(orderOverview.order);

  // 3. Verify order details
  expect(
    CommonUtils.normalizeLowerCase(await myAccountPage.getAllOrderText())
  ).toEqual(CommonUtils.normalizeLowerCase(randomProductName));

  const addressText = await myAccountPage.billingAddressDetails.innerText();
  const normalized = addressText.replace(/\s+/g, " ").trim();

  expect(await CommonSteps.removeStateFromString(normalized)).toEqual(
    await CommonSteps.getStringForCheckoutInformation("full")
  );
});
