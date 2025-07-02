import { Page, expect } from "@playwright/test";
import { CommonUtils } from "@utils/common-utils";
import { CommonSteps } from "@utils/common-steps";

export default class ShopPage {
  readonly closeAdButton = this.page.locator("button.pum-close");
  readonly priceAllProduct = this.page.locator(
    ":is(span.price > ins > span,span.price > span)"
  );

  constructor(private readonly page: Page) {}

  async turnOffAd() {
    await this.closeAdButton.click();
  }

  async sortingProduct(sortingMethod: string) {
    await this.page.waitForSelector(".orderby");
    await this.page.selectOption(".orderby", { label: `${sortingMethod}` });
  }

  async addToCart(productName: string | string[]) {
    CommonSteps.addToCart(this.page, productName);
  }

  async verifyOrderItemSorting(sortingMethod: "greater" | "less") {
    await this.page.waitForTimeout(3000);
    const texts = await this.priceAllProduct.allTextContents();
    const listTexts: string[] = Object.values(texts);
    console.log(listTexts);
    return CommonUtils.isSorted(listTexts, sortingMethod);
  }
}
