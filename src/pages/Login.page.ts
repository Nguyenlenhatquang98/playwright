import { TestConfig } from "@config/TestConfig";
import { Page, expect } from "@playwright/test";

export default class LoginPage {
  readonly loginLink = this.page.getByRole("link", {
    name: "Log in / Sign up",
  });
  readonly usernameLabel = this.page.getByLabel("Username or email address");
  readonly passwordLabel = this.page.getByLabel("Password");
  readonly loginButton = this.page.getByRole("button", { name: "Log in" });

  constructor(private readonly page: Page) {}

  async login() {
    await this.loginLink.click();
    await this.usernameLabel.fill(TestConfig.app_username);
    await this.passwordLabel.fill(TestConfig.app_password);
    await this.loginButton.click();
  }
}
