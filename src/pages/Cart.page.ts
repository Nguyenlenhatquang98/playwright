import { Page, expect } from '@playwright/test';

export default class CartPage{

    constructor(private readonly page: Page) {}

    async proceedToCheckout(){
        await this.page.getByText('Proceed to checkout').click();
    }

}