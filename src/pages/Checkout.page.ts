import { Locator, Page, expect } from "@playwright/test";
import customerData from "@data/checkoutInfo.json";
import { CommonSteps } from "@utils/commonSteps";

export default class CheckoutPage {
  readonly firstNameLabel: Locator;
  readonly lastNameLabel: Locator;
  readonly countryfilterButton: Locator;
  readonly searchInput: Locator;
  readonly statefilterButton: Locator;
  readonly streetAddressLabel: Locator;
  readonly townLabel: Locator;
  readonly zipCodeLabel: Locator;
  readonly phoneLabel: Locator;
  readonly emailLabel: Locator;
  readonly orderItems: Locator;
  readonly billingAddressDetails: Locator;
  readonly paymentMethod: Locator;
  readonly successConfirmMessage: Locator;
  readonly orderNumber: Locator;
  readonly errorMessages: Locator;

  constructor(private readonly page: Page) {
    this.firstNameLabel = page.locator("label", {
      hasText: "First name",
    });
    this.lastNameLabel = page.locator("label", { hasText: "Last name" });
    this.countryfilterButton = page
      .locator(".select2-selection__rendered")
      .first();
    this.searchInput = page.locator(".select2-search__field");
    this.statefilterButton = page
      .locator(".select2-selection__rendered")
      .nth(1);
    this.streetAddressLabel = page.locator("label", {
      hasText: "Street address",
    });
    this.townLabel = page.locator("label", { hasText: "Town / City" });
    this.zipCodeLabel = page.locator("label", { hasText: "ZIP Code" });
    this.phoneLabel = page.locator("label", { hasText: "Phone" });
    this.emailLabel = page.locator("label", {
      hasText: "Email address",
    });
    this.orderItems = page.locator("td.product-name");
    this.billingAddressDetails = page.locator("address");
    this.paymentMethod = page.locator(
      ".woocommerce-order-overview__payment-method.method strong"
    );
    this.successConfirmMessage = page.locator(".woocommerce-notice--success");
    this.orderNumber = page.locator(
      ".woocommerce-order-overview__order.order strong"
    );
    this.errorMessages = page.locator("ul.woocommerce-error strong");
  }

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
