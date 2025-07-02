import { TestConfig } from "@config/TestConfig";
import { Page, expect } from "@playwright/test";

export default class MenuSectionPage {
  readonly menuAllDepartments1 = this.page.locator("#menu-all-departments-1");
  readonly menuAllDepartments = this.page.locator(".secondary-menu-wrapper");
  readonly cartLink = this.page.locator(".woocommerce-Price-amount").first();
  readonly myAccountLink = this.page.getByRole("link", {
    name: TestConfig.app_username.split("@")[0],
  });

  constructor(private readonly page: Page) {}

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
    await this.page.getByText(item).nth(1).click();
  }

  async navigateToMyAccount() {
    await this.myAccountLink.click();
  }

  async switchMode(mode: string) {
    await this.page.locator(".switch-" + mode).click();
    await this.page.waitForTimeout(2000);
  }
}
