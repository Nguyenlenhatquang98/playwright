import { Page, expect } from "@playwright/test";
import { CommonUtils } from "@utils/common-utils";

export default class CartPage {
  readonly proceedButton = this.page.getByText("Proceed to checkout");
  readonly orderItems = this.page.locator(".product-title");

  constructor(private readonly page: Page) {}

  async proceedToCheckout() {
    await this.proceedButton.click();
  }

  async verifyItemDetailsOrderInCartPage(productName: string | string[]) {
    return CommonUtils.filterLocatorByName(this.orderItems, productName);
  }
}
