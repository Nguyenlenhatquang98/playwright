import { Page, expect } from '@playwright/test';

export default class MenuSectionPage {


    constructor(private readonly page: Page) {}

    async navigateToDepartment(department: string){
        await this.page.getByText('All departments').hover();
        await this.page.getByText(department).nth(1).click();
    }

    async navigateToCart(){
        await this.page.waitForTimeout(2000);
        await this.page.locator('.woocommerce-Price-amount').first().click();
    }

    async navigateToMenuItem(item: string){
       await this.page.getByText(item).nth(1).click();
    }

    async switchMode(mode: string){
        await this.page.waitForTimeout(2000);
        await this.page.locator('.switch-'+ mode).click()
    }

}