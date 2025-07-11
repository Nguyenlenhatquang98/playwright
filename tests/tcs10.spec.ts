import { CommonUtils } from "@utils/commonUtils";
import { test, expect } from "@utils/fixtures";

test("Verify users can post a review", async ({ page, pages }) => {
  const { shopPage, menuSectionPage, productDetailsPage } = pages;

  // 1. Open browser and go to url
  // 2. Login with valid credentials

  // 3. Go to Shop page
  await menuSectionPage.navigateToMenuItem("Shop");

  // Turn off Ad
  await expect(page).toHaveTitle(/Products/);
  await shopPage.turnOffAd();

  // 4. Click on a product to view detail
  let randomProductName = await shopPage.getRandomProductName();
  randomProductName = Array.isArray(randomProductName)
    ? randomProductName[0]
    : randomProductName;

  await shopPage.goToProductDetails(randomProductName);
  await expect(page).toHaveTitle(
    new RegExp(
      randomProductName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ".*",
      "i"
    )
  );

  // 5. Scroll down then click on REVIEWS tab
  await productDetailsPage.clickReviewButton();

  // 6. Submit a review
  const rating = Number(CommonUtils.getRandomNumber(1, 5));
  const commentContent = CommonUtils.getRandomString(10);

  await productDetailsPage.ratingProduct(rating);
  await productDetailsPage.reviewProduct(commentContent);
  await productDetailsPage.submitReview();

  // 7. Verify new review
  console.log(await productDetailsPage.getReviewText());
  expect(await productDetailsPage.getReviewText()).toContain(commentContent);
  expect(
    await productDetailsPage.getRatingBaseOnReviewText(commentContent)
  ).toEqual(rating);
});
