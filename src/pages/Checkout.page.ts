import { Page, expect } from '@playwright/test';
import customerInfo from '../data/checkoutInfo.json'

export default class CheckoutPage{

    constructor(private readonly page: Page) {}

    async fillOrderInfomation(){
        await this.page.locator('label', { hasText: 'First name'}).fill(customerInfo.firstname);
        await this.page.locator('label', { hasText: 'Last name'}).fill(customerInfo.lastname);
        await this.page.locator('.select2-selection__rendered').first().click();
        await this.page.locator('.select2-search__field').fill(customerInfo.country);
        await this.page.locator('.select2-search__field').press('Enter');
        await this.page.locator('label', { hasText: 'Street address'}).fill(customerInfo.address);
        await this.page.locator('label', { hasText: 'Town / City'}).fill(customerInfo.city);
        await this.page.locator('.select2-selection__rendered').nth(1).click();
        await this.page.locator('.select2-search__field').fill(customerInfo.state);
        await this.page.locator('.select2-search__field').press('Enter');
        await this.page.locator('label', { hasText: 'ZIP Code'}).fill(customerInfo.zipcode);
        await this.page.locator('label', { hasText: 'Phone'}).fill(customerInfo.phonenumber);
        await this.page.locator('label', { hasText: 'Email address'}).fill(customerInfo.email);
    }

    async placeOrder(){
        await this.page.getByRole('button',{name: 'Place order'}).click();
    }

}