import { TestConfig } from "@config/TestConfig";
import { Locator, Page, expect } from "@playwright/test";

export default class LoginPage {
  readonly loginLink: Locator;
  readonly usernameLabel: Locator;
  readonly passwordLabel: Locator;
  readonly loginButton: Locator;
  constructor(private readonly page: Page) {
    this.loginLink = page.getByRole("link", {
      name: "Log in / Sign up",
    });
    this.usernameLabel = page.getByLabel("Username or email address");
    this.passwordLabel = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Log in" });
  }

  async login() {
    await this.loginLink.click();
    await this.usernameLabel.fill(TestConfig.app_username);
    await this.passwordLabel.fill(TestConfig.app_password);
    await this.loginButton.click();
  }
}
