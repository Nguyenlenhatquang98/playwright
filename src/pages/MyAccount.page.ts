import { TestConfig } from "@config/TestConfig";
import { Page, expect } from "@playwright/test";
import { CommonUtils } from "@utils/common-utils";

export default class MyAccountPage {
  readonly orderLink = this.page.locator(
    ".woocommerce-MyAccount-navigation-link--orders"
  );
  readonly orderItems = this.page.locator("td.product-name a");
  readonly billingAddressDetails = this.page.locator("address");

  constructor(private readonly page: Page) {}

  async navigateToOrders() {
    await this.orderLink.click();
  }

  async viewOrder(orderId: string) {
    await this.page
      .locator(`a[href*="/view-order/${orderId}/"]`)
      .nth(1)
      .click();
  }

  async verifyItemDetailsOrderInOrderPage(productName: string | string[]) {
    return CommonUtils.filterLocatorByName(this.orderItems, productName);
  }
}
