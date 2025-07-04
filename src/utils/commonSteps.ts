import { Locator, Page, expect } from "@playwright/test";
import { CommonUtils } from "@utils/commonUtils";

export class CommonSteps {
  static async addToCart(page: Page, productName: string | string[]) {
    if (typeof productName === "string") {
      productName = productName.trim() === "" ? [] : [productName];
    }
    for (let i = 0; i < productName.length; i++) {
      await page.waitForTimeout(3000);
      await page
        .locator(`[data-product_name="${productName[i]}"]`)
        .nth(1)
        .click();
    }
  }

  static async goToProductDetails(page: Page, name: string) {
    await page.getByText(name).click();
  }

  static async switchMode(page: Page, mode: string) {
    await page.locator(".switch-" + mode).click();
    await page.waitForTimeout(3000);
  }

  static async filterLocatorByName(
    locator: Locator,
    productName: string | string[]
  ) {
    console.log("All textcontent: " + (await locator.allInnerTexts()));
    if (typeof productName === "string") {
      productName = productName.trim() === "" ? [] : [productName];
    }
    const uniqueList = CommonUtils.removeDuplicates(productName);

    for (let i = 0; i < uniqueList.length; i++) {
      console.log("Filter for: " + uniqueList[i]);
      const count = await locator.filter({ hasText: uniqueList[i] }).count();
      if (count != 1) return false;
    }
    return true;
  }
}
