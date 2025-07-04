import { Locator, Page, expect } from "@playwright/test";
import { CommonSteps } from "@utils/commonSteps";

export default class ProductDetailsPage {
  readonly reviewButton: Locator;
  readonly reviewTextArea: Locator;
  readonly submitButton: Locator;
  readonly reviewDescriptionList: Locator;

  constructor(private readonly page: Page) {
    this.reviewButton = page.locator("span:has-text('Reviews')");
    this.reviewTextArea = page.locator("textarea#comment");
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.reviewDescriptionList = page.locator("div.description p");
  }

  async clickReviewButton() {
    await this.reviewButton.click();
  }

  async ratingProduct(rate: number) {
    if (rate < 1 || rate > 5) throw new Error("Rate must be between 1 and 5");
    await this.page.locator(`a.star-${rate.toString()}`).click();
  }

  async reviewProduct(content: string) {
    await this.reviewTextArea.fill(content);
  }

  async submitReview() {
    await this.submitButton.click();
    await this.page.waitForTimeout(3000);
  }

  async verifyNewReview(rate: number, content: string) {
    if (rate < 1 || rate > 5) throw new Error("Rate must be between 1 and 5");
    if (!CommonSteps.filterLocatorByName(this.reviewDescriptionList, content))
      return false;
    const rating = await this.page
      .locator(`p:has-text("${content}")`)
      .locator('xpath=ancestor::div[contains(@class, "comment-text")]')
      .locator(".star-rating .rating")
      .innerText();
    return parseInt(rating, 10) === rate;
  }
}
