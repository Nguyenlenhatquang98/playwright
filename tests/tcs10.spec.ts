import { CommonUtils } from "@utils/common-utils";
import { test, expect } from "@utils/Fixtures";

test("Verify users can post a review", async ({ page, pages }) => {
  const { shopPage, menuSectionPage, productDetailsPage } = pages;

  // 1. Open browser and go to https://demo.testarchitect.com/
  // 2. Login with valid credentials

  // 3. Go to Shop page
  await menuSectionPage.navigateToMenuItem("Shop");

  // Turn off Ad
  await expect(page).toHaveTitle(/Products/);
  await shopPage.turnOffAd();

  // 4. Click on a product to view detail
  await shopPage.goToProductDetails("Beats Solo3 Wireless On-Ear");
  await expect(page).toHaveTitle(/Beats Solo3 Wireless On-Ear/);

  // 5. Scroll down then click on REVIEWS tab
  await productDetailsPage.clickReviewButton();

  // 6. Submit a review
  const rating = CommonUtils.getRandomNumber(1, 5);
  const commentContent = CommonUtils.getRandomString(10);

  await productDetailsPage.ratingProduct(rating);
  await productDetailsPage.reviewProduct(commentContent);
  await productDetailsPage.submitReview();

  // 7. Verify new review
  expect(await productDetailsPage.verifyNewReview(rating, commentContent)).toBe(
    true
  );
});
