import { test, expect } from "@utils/Fixtures";
import customerInfo from "@data/checkoutInfo.json";

test("Verify users can buy an item successfully", async ({ page, pages }) => {
  const {
    electronicComponentsSuppliesPage,
    menuSectionPage,
    cartPage,
    checkoutPage,
  } = pages;

  // 1. Open browser and go to https://demo.testarchitect.com/
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
  await menuSectionPage.switchMode("grid");
  await expect(page.locator(".products-grid")).toBeVisible();

  // 6. Switch to list view
  await menuSectionPage.switchMode("list");

  // 7. Verify items shown as list
  await expect(page.locator(".products-list")).toBeVisible();

  // 8. Select any item randomly to purchase
  // 9. Click 'Add to Cart'
  await electronicComponentsSuppliesPage.addToCart(
    "DJI Mavic Pro Camera Drone"
  );

  // 10. Go to the cart

  await menuSectionPage.navigateToCart();
  await expect(page).toHaveTitle(new RegExp("Cart"));

  // 11. Verify item details in mini content
  expect(
    await cartPage.verifyItemDetailsOrderInCartPage(
      "DJI Mavic Pro Camera Drone"
    )
  ).toBe(true);

  // 12. Click on Checkout
  await cartPage.proceedToCheckout();

  // 13. Verify Checkbout page displays
  await expect(page).toHaveTitle(new RegExp("Checkout"));

  // 14. Verify item details in order
  expect(
    await checkoutPage.verifyItemDetailsOrderInCheckoutPage(
      "DJI Mavic Pro Camera Drone"
    )
  ).toBe(true);

  // 15. Fill the billing details with default payment method
  await checkoutPage.fillOrderInfomation("full");

  // 16. Click on PLACE ORDER
  await checkoutPage.placeOrder();

  // 17. Verify Order status page displays
  await expect(page).toHaveTitle(new RegExp("Checkout"));

  // 18. Verify the Order details with billing and item information
  const addressText = await checkoutPage.billingAddressDetails.innerText();
  const normalized = addressText.replace(/\s+/g, " ").trim();
  expect(normalized).toContain(customerInfo.full.firstname);
  expect(normalized).toContain(customerInfo.full.lastname);
  expect(normalized).toContain(customerInfo.full.city);
  expect(normalized).toContain(customerInfo.full.phonenumber);
  expect(normalized).toContain(customerInfo.full.email);
});
