import { TestConfig } from "@config/TestConfig";
import { Page, expect } from "@playwright/test";

export default class MyAccountPage {
  readonly orderLink = this.page.getByText("Orders");

  constructor(private readonly page: Page) {}

  async navigateToOrders() {
    await this.orderLink.click();
  }
}
