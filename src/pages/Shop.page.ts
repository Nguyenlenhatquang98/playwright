import { Page, expect } from '@playwright/test';

export default class ShopPage {


    constructor(private readonly page: Page) {}

    async turnOffAd(){
        await expect(this.page.locator('button.pum-close')).toBeVisible();
        await this.page.locator('button.pum-close').click();
    }

    async sortingProduct(sortingMethod: string){
        await this.page.waitForSelector('.orderby');
        // await this.page.selectOption('.orderby', { label : `${sortingMethod}`});
        await this.page.selectOption('.orderby', 'price-desc');
        // await this.page.dispatchEvent('.orderby', 'change');
    }

    async verifyOrderItemSorting(sortingMethod: string){
        const texts = await this.page.locator(':is(span.price > ins > span,span.price > span)').allTextContents();
        console.log(texts);
    }


}