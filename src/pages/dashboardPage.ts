import { Locator, Page } from '@playwright/test';

export class DashboardPage{

    private readonly page: Page

    constructor(page: Page){
        this.page = page;
    }

    public async getDashboardPageTitle(): Promise<string>{
        return await this.page.title();
    }
}