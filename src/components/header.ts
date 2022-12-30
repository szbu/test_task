import { Page, Locator } from '@playwright/test';
import { Dropdown } from '../helpers/dropdown';

export class Header{

    private readonly page: Page;
    private activeProjectInput: Locator;

    constructor(page: Page){
        this.page = page;
        this.activeProjectInput =this.page.locator("id=activeProject_chosen");
    }

    public async selectActiveProjectOption(option: string): Promise<void>{

        let dropdown = new Dropdown(this.page);
        await dropdown.SelectOptionFromChosenSearch(this.activeProjectInput, option);
    }
}