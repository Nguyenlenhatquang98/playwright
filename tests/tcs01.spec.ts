import { test, expect } from "@utils/fixtures";
import { CommonSteps } from "@utils/commonSteps";
import { CommonUtils } from "@utils/commonUtils";

test("Verify users can buy an item successfully", async ({ page, pages }) => {
  const {
    electronicComponentsSuppliesPage,
    menuSectionPage,
    cartPage,
    checkoutPage,
  } = pages;

  // 1. Open browser and go to url
  // 2. Login with valid credentials

  // 3. Navigate to All departments section
  // 4. Select Electronic Components & Supplies
  await menuSectionPage.navigateToDepartment(
    "Electronic Components & Supplies"
  );
  await expect(page).toHaveTitle(
    new RegExp("Electronic Components & Supplies")
  );

  // 5. Verify items shown as grid
  await electronicComponentsSuppliesPage.switchMode("grid");
  await expect(electronicComponentsSuppliesPage.gridView).toBeVisible();

  // 6. Switch to list view
  await electronicComponentsSuppliesPage.switchMode("list");

  // 7. Verify items shown as list
  await expect(electronicComponentsSuppliesPage.listView).toBeVisible();

  // 8. Select any item randomly to purchase
  // 9. Click 'Add to Cart'
  const randomProductName =
    await electronicComponentsSuppliesPage.getRandomProductName();

  electronicComponentsSuppliesPage.addToCart(randomProductName);

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

  // 15. Fill the billing details with default payment method
  await checkoutPage.fillOrderInformation("full");

  // 16. Click on PLACE ORDER
  await checkoutPage.placeOrder();

  // 17. Verify Order status page displays
  await expect(page).toHaveTitle(new RegExp("Checkout"));

  // 18. Verify the Order details with billing and item information
  const addressText = await checkoutPage.billingAddressDetails.innerText();
  const normalized = addressText.replace(/\s+/g, " ").trim();

  expect(await CommonSteps.removeStateFromString(normalized)).toEqual(
    await CommonSteps.getStringForCheckoutInformation("full")
  );
});
