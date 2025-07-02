import { test, expect } from "@utils/Fixtures";

test("Verify users can sort items by price", async ({ page, pages }) => {
  const { menuSectionPage, shopPage } = pages;

  // 1. Open browser and go to https://demo.testarchitect.com/
  // 2. Login with valid credentials

  // 3. Go to Shop page
  await menuSectionPage.navigateToMenuItem("Shop");

  // Turn off Ad
  await expect(page).toHaveTitle(/Products/);
  await shopPage.turnOffAd();

  // 4.  Switch view to list
  await menuSectionPage.switchMode("list");

  // 5. Sort items by price (high to low)
  await shopPage.sortingProduct("Sort by price: high to low");

  //   6. Verify the order of items
  expect(await shopPage.verifyOrderItemSorting("greater")).toBe(true);
});
