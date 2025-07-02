import { Page, expect } from "@playwright/test";
import { CommonUtils } from "@utils/common";
import customerInfo from "../data/checkoutInfo.json";

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

  constructor(private readonly page: Page) {}

  async choosePayMethod(method: string) {
    await this.page.getByLabel(method).click();
  }

  async fillOrderInfomation() {
    await this.firstNameLabel.fill(customerInfo.firstname);
    await this.lastNameLabel.fill(customerInfo.lastname);
    await this.countryfilterButton.click();
    await this.searchInput.fill(customerInfo.country);
    await this.searchInput.press("Enter");
    await this.streetAddressLabel.fill(customerInfo.address);
    await this.townLabel.fill(customerInfo.city);
    await this.statefilterButton.click();
    await this.searchInput.fill(customerInfo.state);
    await this.searchInput.press("Enter");
    await this.zipCodeLabel.fill(customerInfo.zipcode);
    await this.phoneLabel.fill(customerInfo.phonenumber);
    await this.emailLabel.fill(customerInfo.email);
  }

  async placeOrder() {
    await this.page.getByRole("button", { name: "Place order" }).click();
  }

  async verifyItemDetailsOrderInCheckoutPage(productName: string) {
    return CommonUtils.filterLocatorByName(this.orderItems, productName);
  }
}
