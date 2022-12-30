import { Locator, Page } from '@playwright/test';
import { Table } from '../helpers/table';

export class VersionsPage{

    private readonly page: Page;
    private addNewVersionButton: Locator;
    private searchInput: Locator;
    private searchButton: Locator;
    private versionsTable: Locator;

    constructor(page: Page){
        this.page = page;
        this.addNewVersionButton = this.page.locator("a.button_link", { hasText: "Add a version"});
        this.searchInput = this.page.locator("#search");
        this.searchButton = this.page.locator("#j_searchButton");
        this.versionsTable = this.page.locator("table");
    }

    public async getVersionsPageTitle(): Promise<string>{
        return await this.page.title();
    }

    public async clickAtAddNewVersionButton(): Promise<void>{
        await this.addNewVersionButton.click();
    }

    public async fillSearchInput(text: string): Promise<void>{
        this.searchInput.fill(text);
    }

    public async clickAtSearchButton(): Promise<void>{
        await this.searchButton.click();
    }

    public async getVersionValue(rowNumber: number): Promise<string[]>{
        let table = new Table(this.page);
        return await table.getRowValues(rowNumber); 
    }
}