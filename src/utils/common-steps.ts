import { Page, expect } from "@playwright/test";

export class CommonSteps {
  static addToCart(page: Page, productName: string | string[]) {
    if (typeof productName === "string") {
      productName = productName.trim() === "" ? [] : [productName];
    }
    for (let i = 0; i < productName.length; i++) {
      page.waitForTimeout(3000);
      page.locator(`[data-product_name="${productName[i]}"]`).nth(1).click();
    }
  }

  static goToProductDetails(page: Page, name: string) {
    page.getByText(name).click();
  }
}
