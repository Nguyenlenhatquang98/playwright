import { test, expect } from "@utils/fixtures";

test("Verify users can update quantity of product in cart", async ({
  page,
  pages,
}) => {
  const { shopPage, menuSectionPage, cartPage, checkoutPage } = pages;

  // 1. Open browser and go to url
  // 2. Login with valid credentials

  // 3. Go to Shop page
  await menuSectionPage.navigateToMenuItem("Shop");

  // Turn off Ad
  await expect(page).toHaveTitle(/Products/);
  await shopPage.turnOffAd();

  // 4. Add a product
  let randomProductName = await shopPage.getRandomProductName();
  randomProductName = Array.isArray(randomProductName)
    ? randomProductName[0]
    : randomProductName;

  await shopPage.addToCart(randomProductName);

  // 5. Go to the cart
  await menuSectionPage.navigateToCart();
  await expect(page).toHaveTitle(new RegExp("Cart"));

  await cartPage.updateOrderQuantity(randomProductName, "fill", 4);

  expect(await cartPage.getQuantityInputValue(randomProductName)).toEqual(4);

  await cartPage.updateOrderQuantity(randomProductName, "click", 6);

  expect(await cartPage.getQuantityInputValue(randomProductName)).toEqual(6);

  await cartPage.updateOrderQuantity(randomProductName, "click", 5);

  expect(await cartPage.getQuantityInputValue(randomProductName)).toEqual(5);
});
