import { Locator, Page, expect } from "@playwright/test";
import { CommonUtils } from "@utils/commonUtils";
import { CommonSteps } from "@utils/commonSteps";

export default class ShopPage {
  readonly closeAdButton = this.page.locator("button.pum-close");
  readonly listView = this.page.locator(".products-list");
  readonly loader = this.page.locator(".et-loader.product-ajax.loading");
  readonly ad = this.page.locator("#pum-5701");

  readonly priceAllProduct = this.page.locator(
    ":is(span.price > ins > span, span.price > span)"
  );

  constructor(private readonly page: Page) {}

  async turnOffAd() {
    await this.closeAdButton.click();
    await expect(this.ad).toBeHidden();
  }

  async sortingProduct(sortingMethod: string) {
    await this.page.waitForSelector(".orderby");
    await this.page.selectOption(".orderby", { label: sortingMethod });
    await CommonSteps.waitForLoaderToAppearAndDisappear(this.loader);
  }

  async getRandomProductName(amount: number = 1) {
    return await CommonSteps.getRandomProductName(this.page, amount);
  }

  async addToCart(productName: string | string[]) {
    await CommonSteps.addToCart(this.page, productName);
  }

  async verifyOrderItemSorting(sortingMethod: "greater" | "less") {
    const texts = await this.priceAllProduct.allTextContents();
    const listTexts: string[] = Object.values(texts);
    console.log(listTexts);
    return CommonUtils.isSorted(listTexts, sortingMethod);
  }

  async goToProductDetails(name: string) {
    CommonSteps.goToProductDetails(this.page, name);
  }

  async switchMode(mode: string) {
    await CommonSteps.switchMode(this.page, mode);
    await CommonSteps.waitForLoaderToAppearAndDisappear(this.loader);
  }
}
