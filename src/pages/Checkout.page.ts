import { Page, expect } from "@playwright/test";
import customerData from "@data/checkoutInfo.json";
import { CommonSteps } from "@utils/commonSteps";

export default class CheckoutPage {
  readonly firstNameLabel = this.page.locator("label", {
    hasText: "First name",
  });
  readonly lastNameLabel = this.page.locator("label", { hasText: "Last name" });
  readonly countryfilterButton = this.page
    .locator(".select2-selection__rendered")
    .first();
  readonly searchInput = this.page.locator(".select2-search__field");
  readonly statefilterButton = this.page
    .locator(".select2-selection__rendered")
    .nth(1);
  readonly streetAddressLabel = this.page.locator("label", {
    hasText: "Street address",
  });
  readonly townLabel = this.page.locator("label", { hasText: "Town / City" });
  readonly zipCodeLabel = this.page.locator("label", { hasText: "ZIP Code" });
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
  readonly errorMessages = this.page.locator("ul.woocommerce-error strong");

  constructor(private readonly page: Page) {}

  async choosePayMethod(method: string) {
    await this.page.getByLabel(method).click();
  }

  async fillOrderInfomation(status: "full" | "missing") {
    const customerInfo = customerData[status];

    const fieldMap: { [key: string]: Locator } = {
      firstname: this.firstNameLabel,
      lastname: this.lastNameLabel,
      address: this.streetAddressLabel,
      city: this.townLabel,
      zipcode: this.zipCodeLabel,
      phonenumber: this.phoneLabel,
      email: this.emailLabel,
    };

    for (const key in fieldMap) {
      const value = customerInfo[key] ?? "";
      await fieldMap[key].fill(value);
    }

    await this.countryfilterButton.click();
    await this.searchInput.fill(customerInfo.country ?? "");
    await this.searchInput.press("Enter");

    await this.statefilterButton.click();
    await this.searchInput.fill(customerInfo.state ?? "");
    await this.searchInput.press("Enter");
  }

  async verifyErrorMessage(status: "full" | "missing") {
    await this.page.waitForTimeout(3000);
    const customerInfo = customerData[status];

    const requiredFields = [
      "firstname",
      "lastname",
      "country",
      "address",
      "city",
      "state",
      "zipcode",
      "phonenumber",
      "email",
    ];

    const missingFields = requiredFields.filter(
      (field) => !customerInfo[field]
    );

    return CommonSteps.filterLocatorByName(this.errorMessages, missingFields);
  }

  async placeOrder() {
    await this.page.getByRole("button", { name: "Place order" }).click();
  }

  async verifyItemDetailsOrderInCheckoutPage(productName: string | string[]) {
    return CommonSteps.filterLocatorByName(this.orderItems, productName);
  }
}
