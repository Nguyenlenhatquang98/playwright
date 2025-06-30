import { test, expect } from 'src/utils/fixtures';

test('Verify users can buy multiple item successfully', async({ page, pages }) => {
    const { menuSectionPage, shopPage } = pages;
    
    // 1. Open browser and go to https://demo.testarchitect.com/
    // 2. Login with valid credentials 

    // 3. Go to Shop page
    await menuSectionPage.navigateToMenuItem('Shop');

    // Turn off Ad
    await expect(page).toHaveTitle(/Products/);
    await shopPage.turnOffAd();

    // 4.  Switch view to list
    await menuSectionPage.switchMode('list');
    await page.waitForTimeout(2000);

    // 5. Sort items by price (high to low)
    await shopPage.sortingProduct('Sort by price: high to low');

    await page.waitForTimeout(5000);

    await shopPage.verifyOrderItemSorting('hello');



});
