import { expect, Locator, Page } from "@playwright/test";
import customerData from "@data/checkoutInfo.json";
import { CommonSteps } from "@utils/commonSteps";
import { CommonUtils } from "@utils/commonUtils";

export default class CheckoutPage {
  readonly firstNameLabel = this.page.locator("label", {
    hasText: "First name",
  });
  readonly lastNameLabel = this.page.locator("label", {
    hasText: "Last name",
  });
  readonly countryFilterButton = this.page
    .locator(".select2-selection__rendered")
    .first();
  readonly searchInput = this.page.locator(".select2-search__field");
  readonly stateFilterButton = this.page
    .locator(".select2-selection__rendered")
    .nth(1);
  readonly streetAddressLabel = this.page.locator("label", {
    hasText: "Street address",
  });
  readonly townLabel = this.page.locator("label", { hasText: "Town / City" });
  readonly zipCodeLabel = this.page.locator("label", {
    hasText: "ZIP Code",
  });
  readonly phoneLabel = this.page.locator("label", { hasText: "Phone" });
  readonly emailLabel = this.page.locator("label", {
    hasText: "Email address",
  });
  readonly orderItems = this.page.locator("td.product-name");
  readonly billingAddressDetails = this.page.locator("address");
  readonly paymentMethod = this.page.locator(
    ".woocommerce-order-overview__payment-method.method strong"
  );
  readonly successConfirmMessage = this.page.locator(
    ".woocommerce-notice--success"
  );
  readonly orderNumber = this.page.locator(
    ".woocommerce-order-overview__order.order strong"
  );

  readonly orderDate = this.page.locator(
    ".woocommerce-order-overview__date.date strong"
  );

  readonly orderTotal = this.page.locator(
    ".woocommerce-order-overview__total.total strong"
  );

  readonly errorMessages = this.page.locator("ul.woocommerce-error li");

  constructor(private readonly page: Page) {}

  async choosePayMethod(method: string) {
    await this.page.getByLabel(method).click();
  }

  async fillOrderInformation(status: "full" | "missing") {
    const customerInfo = customerData[status];

    const fieldMap: { [key: string]: Locator } = {
      firstName: this.firstNameLabel,
      lastName: this.lastNameLabel,
      address: this.streetAddressLabel,
      city: this.townLabel,
      zipCode: this.zipCodeLabel,
      phoneNumber: this.phoneLabel,
      email: this.emailLabel,
    };

    for (const key in fieldMap) {
      const value = customerInfo[key] ?? "";
      await fieldMap[key].fill(value);
    }

    await this.countryFilterButton.click();
    await this.searchInput.fill(customerInfo.country ?? "");
    await this.searchInput.press("Enter");

    await this.stateFilterButton.click();
    await this.searchInput.fill(customerInfo.state ?? "");
    await this.searchInput.press("Enter");
  }

  async getMissingFieldMessages(status: "full" | "missing"): Promise<string[]> {
    const customerInfo = customerData[status];
    const requiredFields = [
      "firstName",
      "lastName",
      "country",
      "address",
      "city",
      "state",
      "zipCode",
      "phoneNumber",
      "email",
    ];
    const fieldLabels: Record<string, string> = {
      firstName: "First name",
      lastName: "Last name",
      country: "Country / Region",
      address: "Street address",
      city: "Town / City",
      state: "State",
      zipCode: "Postcode / ZIP",
      phoneNumber: "Phone",
      email: "Email address",
    };

    return requiredFields
      .filter((field) => !customerInfo[field])
      .map((field) => `Billing ${fieldLabels[field]} is a required field.`);
  }

  async placeOrder() {
    await this.page.getByRole("button", { name: "Place order" }).click();
  }

  async getOrderOverview(): Promise<{
    order: string;
    date: string;
    total: string;
  }> {
    const [orderNumber, orderDate, orderTotal] = await Promise.all([
      this.orderNumber.innerText(),
      this.orderDate.innerText(),
      this.orderTotal.innerText(),
    ]);

    return {
      order: orderNumber.trim(),
      date: orderDate.trim(),
      total: orderTotal.trim(),
    };
  }

  async getAllOrderText() {
    await this.orderItems.first().waitFor({ state: "visible" });
    return CommonSteps.getText(this.orderItems);
  }

  async getErrorMessageText() {
    await expect(this.errorMessages.first()).toBeVisible({ timeout: 5000 });
    return CommonSteps.getText(this.errorMessages);
  }
}
