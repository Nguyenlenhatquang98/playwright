import { Page, expect } from "@playwright/test";
import { CommonSteps } from "@utils/commonSteps";

export default class ElectronicComponentsSuppliesPage {
  readonly gridView = this.page.locator(".products-grid");
  readonly listView = this.page.locator(".products-list");

  constructor(private readonly page: Page) {}

  async getRandomProductName(amount: number = 1) {
    return await CommonSteps.getRandomProductName(this.page, amount);
  }

  async addToCart(productName: string | string[]) {
    await CommonSteps.addToCart(this.page, productName);
  }

  async switchMode(mode: string) {
    await CommonSteps.switchMode(this.page, mode);
  }
}
