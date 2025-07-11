import { Locator, Page, expect } from "@playwright/test";
import { CommonSteps } from "@utils/commonSteps";

export default class CartPage {
  readonly proceedButton = this.page.getByText("Proceed to checkout");
  readonly orderItems = this.page.locator(".product-title");
  readonly quantityInput = this.page.locator("td.product-quantity input");
  readonly updateCartButton = this.page.getByRole("button", {
    name: "Update cart",
  });
  readonly clearCartButton = this.page.getByText("Clear shopping cart");
  readonly emptyShoppingCartText = this.page.getByText(
    "YOUR SHOPPING CART IS EMPTY"
  );
  readonly removeButtons = this.page.locator("a.remove-item");

  constructor(private readonly page: Page) {}

  async proceedToCheckout() {
    await this.proceedButton.click();
  }

  async getAllOrderText() {
    return CommonSteps.getText(this.orderItems);
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

  async clearItems() {
    if (!(await this.emptyShoppingCartText.isVisible())) {
      const count = await this.removeButtons.count();
      await this.page.waitForTimeout(3000);
      console.log("current items existed in cart " + count);
      for (let i = 0; i < count; i++) {
        await this.removeButtons.first().click();
      }
    }
  }
}
