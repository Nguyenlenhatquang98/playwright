import { Locator, Page, expect } from "@playwright/test";
import { CommonSteps } from "@utils/commonSteps";

export default class CartPage {
  readonly proceedButton: Locator;
  readonly orderItems: Locator;
  readonly quantityInput: Locator;
  readonly updateCartButton: Locator;
  readonly clearCartButton: Locator;
  readonly emptyShoppingCartText: Locator;

  constructor(private readonly page: Page) {
    this.proceedButton = page.getByText("Proceed to checkout");
    this.orderItems = page.locator(".product-title");
    this.quantityInput = page.locator("td.product-quantity input");
    this.updateCartButton = page.getByRole("button", {
      name: "Update cart",
    });
    this.clearCartButton = page.getByText("Clear shopping cart");
    this.emptyShoppingCartText = page.getByText("YOUR SHOPPING CART IS EMPTY");
  }

  async proceedToCheckout() {
    await this.proceedButton.click();
  }

  async verifyItemDetailsOrderInCartPage(productName: string | string[]) {
    return CommonSteps.filterLocatorByName(this.orderItems, productName);
  }

  async updateOrderQuantity(
    name: string,
    method: "click" | "fill",
    target: number
  ) {
    const base = `div.quantity:has(label:has-text("${name}"))`;
    const input = this.page.locator(`${base} input`);
    const current = Number(await input.inputValue());
    const diff = target - current;

    if (method === "fill") {
      await input.fill(String(target));
      await this.updateCartButton.click();
    } else {
      const btn = this.page.locator(`${base} .${diff > 0 ? "plus" : "minus"}`);
      for (let i = Math.abs(diff); i-- > 0; ) await btn.click();
    }

    await this.page.waitForTimeout(4000);
  }

  async getQuantityInputValue(name: string) {
    const base = `div.quantity:has(label:has-text("${name}"))`;
    const input = this.page.locator(`${base} input`);
    return Number(await input.inputValue());
  }

  async clearOrderItems() {
    await this.clearCartButton.click();

    this.page.once("dialog", async (dialog) => {
      console.log("Message:", dialog.message());
      expect(dialog.type()).toBe("confirm");
      await dialog.accept();
    });
  }
}
