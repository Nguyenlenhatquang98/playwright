import { Locator, Page, expect } from "@playwright/test";
import { CommonUtils } from "@utils/commonUtils";
import customerInfo from "@data/checkoutInfo.json";

export class CommonSteps {
  static async addToCart(page: Page, productName: string | string[]) {
    if (typeof productName === "string") {
      productName = productName.trim() === "" ? [] : [productName];
    }
    for (let i = 0; i < productName.length; i++) {
      const allProducts = page.locator(".product-details");
      const matchedProduct = allProducts.filter({ hasText: productName[i] });
      const button = matchedProduct.locator("a.add_to_cart_button").first();
      console.log("add to cart for: " + button);
      await button.isVisible();
      await button.scrollIntoViewIfNeeded();
      await button.click();
    }
  }

  static async getRandomProductName(page: Page, amount: number = 1) {
    const listProductName = await page
      .locator("h2.product-title")
      .allInnerTexts();
    console.log("list product name: " + listProductName);
    const randomNumber = CommonUtils.getRandomNumber(
      1,
      listProductName.length - 1,
      amount
    );
    console.log("list random number: " + randomNumber);
    const randomProductName = CommonUtils.getItemsByIndexes(
      listProductName,
      randomNumber
    );
    console.log("list random product name: " + randomProductName);
    return randomProductName;
  }

  static async goToProductDetails(page: Page, name: string) {
    await page.getByText(name).first().click();
  }

  static async switchMode(page: Page, mode: string) {
    await page.locator(".switch-" + mode).click();
    await page.waitForTimeout(3000);
  }

  static async getText(locator: Locator) {
    const order = await locator.allInnerTexts();
    console.log("text get from locator: " + order);
    const orderConvert = CommonUtils.normalizeProductList(
      await locator.allInnerTexts()
    );
    console.log("text after processing: " + orderConvert);
    return orderConvert;
  }

  static async getStringForCheckoutInformation(
    type: keyof typeof customerInfo
  ) {
    const i = customerInfo[type] as Partial<(typeof customerInfo)["full"]>;
    return [
      i.firstName,
      i.lastName,
      i.address,
      i.city && `${i.city},`,
      i.zipCode,
      i.phoneNumber,
      i.email,
    ]
      .filter(Boolean)
      .join(" ");
  }

  static async removeStateFromString(str: string) {
    return str
      .replace(/\b[A-Z]{2}\b/, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }
}
