import { Page, expect } from '@playwright/test';
import { TestConfig } from '@config/TestConfig';


export default class LoginPage {

    static readonly usernameLabel = 'Username or email address';
    static readonly passwordLabel = 'Password';

    constructor(private readonly page: Page) {}

    async login(){
        await this.page.goto(TestConfig.baseURL);
        await this.page.getByText('Log in / Sign up').first().click();
        await this.page.getByLabel(LoginPage.usernameLabel).fill(TestConfig.username);
        await this.page.getByLabel(LoginPage.passwordLabel).fill(TestConfig.password);
        await this.page.getByRole('button', {name: 'Log in'}).click();
    }

}