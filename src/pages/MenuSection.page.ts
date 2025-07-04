import { TestConfig } from "@config/TestConfig";
import { Locator, Page, expect } from "@playwright/test";

export default class MenuSectionPage {
  readonly menuAllDepartments1: Locator;
  readonly menuAllDepartments: Locator;
  readonly cartLink: Locator;
  readonly myAccountLink: Locator;

  constructor(private readonly page: Page) {
    this.menuAllDepartments1 = page.locator("#menu-all-departments-1");
    this.menuAllDepartments = page.locator(".secondary-menu-wrapper");
    this.cartLink = page.locator(".woocommerce-Price-amount").first();
    this.myAccountLink = page.getByRole("link", {
      name: TestConfig.app_username.split("@")[0],
    });
  }

  async navigateToDepartment(department: string) {
    for (let i = 0; i < 10; i++) {
      this.menuAllDepartments.click();
      await this.page.waitForTimeout(1000);
      if (this.menuAllDepartments1.isVisible()) {
        break;
      }
    }
    await this.page.getByText(department).nth(1).click();
  }

  async navigateToCart() {
    await this.page.waitForTimeout(3000);
    await this.cartLink.click();
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
