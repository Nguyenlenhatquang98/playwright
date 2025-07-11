import { Page } from "@playwright/test";
import { CommonSteps } from "@utils/commonSteps";

export default class MyAccountPage {
  readonly orderLink = this.page.locator(
    ".woocommerce-MyAccount-navigation-link--orders"
  );
  readonly orderItems = this.page.locator("td.product-name a");
  readonly billingAddressDetails = this.page.locator("address");
  readonly listRowOrder = this.page.locator(
    "table.woocommerce-orders-table tbody tr"
  );

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

  async getAllOrderText() {
    return CommonSteps.getText(this.orderItems);
  }

  async getOrderInfoById(orderId: string): Promise<{
    order: string;
    date: string;
    status: string;
    total: string;
    action: string;
  }> {
    const targetRow = this.listRowOrder.filter({ hasText: `#${orderId}` });
    const cells = targetRow.locator("td");
    const cellTexts = await cells.allTextContents();
    const [order, date, status, total, action] = cellTexts.map((text) =>
      text.trim()
    );
    return { order, date, status, total, action };
  }
}
