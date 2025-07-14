import { TestConfig } from "@config/TestConfig";
import { Locator, Page, expect } from "@playwright/test";

export default class MenuSectionPage {
  readonly menuAllDepartments1 = this.page.locator("#menu-all-departments-1");
  readonly menuAllDepartments = this.page.locator(".secondary-menu-wrapper");
  readonly cartLink = this.page.locator(".woocommerce-Price-amount");
  readonly myAccountLink = this.page.getByRole("link", {
    name: TestConfig.app_username.split("@")[0],
  });

  constructor(private readonly page: Page) {}

  async navigateToDepartment(department: string) {
    for (let i = 0; i < 10; i++) {
      this.menuAllDepartments.click();
      if (this.menuAllDepartments1.isVisible()) {
        break;
      }
    }
    await this.page.getByText(department).nth(1).click();
  }

  async navigateToCart(shouldCheckPrice = true) {
    if (shouldCheckPrice) {
      console.log("price first: " + (await this.cartLink.first().innerText()));
      const price = await expect
        .poll(
          async () => {
            const text = await this.cartLink.first().innerText();
            const numeric = text.replace(/[^0-9.]/g, "");
            return parseFloat(numeric);
          },
          {
            timeout: 5000,
            message: "Expected price to be updated and not 0.00",
          }
        )
        .not.toBe(0);
    }
    console.log("price after: " + (await this.cartLink.first().innerText()));
    await this.cartLink.first().click();
  }

  async navigateToMenuItem(item: string) {
    await this.page
      .locator("div.menu-main-container >> nth=1 >> a", { hasText: `${item}` })
      .click();
  }

  async navigateToMyAccount() {
    await this.myAccountLink.click();
  }
}
