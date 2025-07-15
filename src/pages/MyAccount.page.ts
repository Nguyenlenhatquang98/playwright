import { Page } from "@playwright/test";
import { CommonSteps } from "@utils/commonSteps";

export default class MyAccountPage {
  readonly orderLink = this.page.locator(
    ".woocommerce-MyAccount-navigation-link--orders"
  );
  readonly orderItems = this.page.locator("td.product-name a");
  readonly billingAddressDetails = this.page.locator("address");
  readonly tableOrder = this.page.getByRole("table");
  readonly rowOrder = this.tableOrder.getByRole("row");

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
    const targetRow = this.rowOrder.filter({ hasText: `#${orderId}` });
    const cellTexts = await targetRow.getByRole("cell").allTextContents();
    const [order, date, status, total, action] = cellTexts.map((text) =>
      text.trim()
    );
    return { order, date, status, total, action };
  }
}
