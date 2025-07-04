import { test as base } from "@playwright/test";
import LoginPage from "@pages/Login.page";
import ElectronicComponentsSuppliesPage from "@pages/ElectronicComponentsSupplies.page";
import MenuSectionPage from "@pages/MenuSection.page";
import CartPage from "@pages/Cart.page";
import CheckoutPage from "@pages/Checkout.page";
import ShopPage from "@pages/Shop.page";
import MyAccountPage from "@pages/MyAccount.page";
import { TestConfig } from "@config/TestConfig";
import ProductDetailsPage from "@pages/ProductDetailsPage.page";

type Pages = {
  loginPage: LoginPage;
  electronicComponentsSuppliesPage: ElectronicComponentsSuppliesPage;
  menuSectionPage: MenuSectionPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  shopPage: ShopPage;
  myAccountPage: MyAccountPage;
  productDetailsPage: ProductDetailsPage;
};

type FixtureOptions = {
  pages: Pages;
  needsLogin: boolean;
};

export const test = base.extend<FixtureOptions>({
  needsLogin: [true, { option: true }],

  pages: async ({ page, needsLogin }, use) => {
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
      productDetailsPage: new ProductDetailsPage(page),
    };

    await page.goto(TestConfig.baseURL);

    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    await page.evaluate(() => sessionStorage.clear());

    if (needsLogin) {
      await pages.loginPage.login();
    }

    await use(pages);
  },
});

export { expect } from "@playwright/test";
