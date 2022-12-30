import { Page, Locator } from '@playwright/test';

export class Menu{
    private readonly page: Page;
    private sideMenuList: Locator;

    constructor(page: Page){
        this.page = page;
        this.sideMenuList =this.page.locator("ul.menu");
    }

    public async ClickAtItemInSideMenu(itemName: string): Promise<void>{
        await this.sideMenuList.locator("li", { hasText: itemName }).click()
    }
}