import { Page, expect } from "@playwright/test";
import { CommonSteps } from "@utils/commonSteps";

export default class ElectronicComponentsSuppliesPage {
  constructor(private readonly page: Page) {}

  async addToCart(productName: string | string[]) {
    await CommonSteps.addToCart(this.page, productName);
  }

  async switchMode(mode: string) {
    await CommonSteps.switchMode(this.page, mode);
  }
}
