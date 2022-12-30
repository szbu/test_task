import { Page, Locator } from '@playwright/test';

export class Dropdown{
    
    private readonly page: Page

    constructor(page: Page){
        this.page = page;
    }

    public async SelectOptionFromChosenSearch(locator: Locator, option: string): Promise<void>{
        await locator.click();
        const dropdownlist = this.page.locator("ul.chosen-results");
        await dropdownlist
            .locator("li")
            .filter({ hasText: option})
            .click();
    }
}