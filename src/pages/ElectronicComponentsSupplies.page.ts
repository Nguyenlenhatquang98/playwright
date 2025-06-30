import { Page, expect } from '@playwright/test';


export default class ElectronicComponentsSuppliesPage {

    constructor(private readonly page: Page) {}

    async addToCart(productName: string){
        await this.page.locator(`[data-product_name="${productName}"]`).nth(1).click();
    }

}