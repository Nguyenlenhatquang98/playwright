import { Page, expect } from '@playwright/test';

export default class MenuSectionPage {


    constructor(private readonly page: Page) {}

    async navigateToDepartment(department: string){
        await this.page.waitForTimeout(3000);
        await this.page.getByText('All departments').click();
        await this.page.getByText(department).nth(1).click();
    }

    async navigateToCart(){
        await this.page.waitForTimeout(1000);
        await this.page.locator('.woocommerce-Price-amount').first().click();
    }

}