import { Locator, Page, expect } from "@playwright/test";
import { CommonSteps } from "@utils/commonSteps";

export default class ProductDetailsPage {
  readonly reviewButton = this.page.locator("span:has-text('Reviews')");
  readonly reviewTextArea = this.page.locator("textarea#comment");
  readonly submitButton = this.page.getByRole("button", { name: "Submit" });
  readonly reviewDescriptionList = this.page.locator("div.description p");

  constructor(private readonly page: Page) {}

  async clickReviewButton() {
    await this.reviewButton.first().click();
  }

  async ratingProduct(rate: number) {
    if (rate < 1 || rate > 5) throw new Error("Rate must be between 1 and 5");
    await this.page.locator(`a.star-${rate.toString()}`).first().click();
  }

  async reviewProduct(content: string) {
    await this.reviewTextArea.fill(content);
  }

  async submitReview() {
    await this.submitButton.click();
    await this.page.waitForTimeout(3000);
  }

  async getReviewText() {
    return await this.reviewDescriptionList.allInnerTexts();
  }

  async getRatingBaseOnReviewText(content: string) {
    const rating = await this.page
      .locator(`p:has-text("${content}")`)
      .locator('xpath=ancestor::div[contains(@class, "comment-text")]')
      .locator(".star-rating .rating")
      .innerText();
    const actualRating = parseInt(rating, 10);
    console.log(`rating with content: "${content}" is ${actualRating}`);
    return actualRating;
  }
}
