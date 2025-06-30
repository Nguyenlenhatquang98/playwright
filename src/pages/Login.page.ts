import { TestConfig } from '@config/TestConfig';
import { Page, expect } from '@playwright/test';


export default class LoginPage {

    static readonly usernameLabel = 'Username or email address';
    static readonly passwordLabel = 'Password';

    constructor(private readonly page: Page) {}

    async login(){
        await this.page.goto(TestConfig.baseURL);
        await this.page.getByRole('link', { name: 'Log in / Sign up' }).click();
        await this.page.getByLabel(LoginPage.usernameLabel).fill(TestConfig.username);
        await this.page.getByLabel(LoginPage.passwordLabel).fill(TestConfig.password);
        await this.page.getByRole('button', {name: 'Log in'}).click();
    }

}