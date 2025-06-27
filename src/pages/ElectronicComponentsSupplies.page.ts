import { Page, expect } from '@playwright/test';


export default class ElectronicComponentsSuppliesPage {

    constructor(private readonly page: Page) {}

    async switchMode(mode: string){
        await this.page.waitForTimeout(2000);
        await this.page.locator('.switch-'+ mode).click()
    }

    async addToCart(productName: string){
        await this.page.locator(`[data-product_name="${productName}"]`).nth(1).click();
    }

}