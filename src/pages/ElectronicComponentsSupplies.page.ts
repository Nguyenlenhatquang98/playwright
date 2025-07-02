import { Page, expect } from "@playwright/test";
import { CommonSteps } from "@utils/common-steps";

export default class ElectronicComponentsSuppliesPage {
  constructor(private readonly page: Page) {}

  async addToCart(productName: string | string[]) {
    CommonSteps.addToCart(this.page, productName);
  }
}
