import { test as base } from "@playwright/test";
import LoginPage from "@pages/Login.page";
import ElectronicComponentsSuppliesPage from "@pages/ElectronicComponentsSupplies.page";
import MenuSectionPage from "@pages/MenuSection.page";
import CartPage from "@pages/Cart.page";
import CheckoutPage from "@pages/Checkout.page";
import ShopPage from "@pages/Shop.page";
import MyAccountPage from "@pages/MyAccount.page";

type Pages = {
  loginPage: LoginPage;
  electronicComponentsSuppliesPage: ElectronicComponentsSuppliesPage;
  menuSectionPage: MenuSectionPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  shopPage: ShopPage;
  myAccountPage: MyAccountPage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    const pages = {
      loginPage: new LoginPage(page),
      electronicComponentsSuppliesPage: new ElectronicComponentsSuppliesPage(
        page
      ),
      menuSectionPage: new MenuSectionPage(page),
      cartPage: new CartPage(page),
      checkoutPage: new CheckoutPage(page),
      shopPage: new ShopPage(page),
      myAccountPage: new MyAccountPage(page),
    };

    await pages.loginPage.login();

    await use(pages);
  },
});

export { expect } from "@playwright/test";
