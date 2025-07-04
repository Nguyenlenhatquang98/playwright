import { TestConfig } from "@config/TestConfig";
import { Locator, Page, expect } from "@playwright/test";
import { CommonSteps } from "@utils/commonSteps";

export default class MyAccountPage {
  readonly orderLink: Locator;
  readonly orderItems: Locator;
  readonly billingAddressDetails: Locator;

  constructor(private readonly page: Page) {
    this.orderLink = page.locator(
      ".woocommerce-MyAccount-navigation-link--orders"
    );
    this.orderItems = page.locator("td.product-name a");
    this.billingAddressDetails = page.locator("address");
  }

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
    return CommonSteps.filterLocatorByName(this.orderItems, productName);
  }
}
