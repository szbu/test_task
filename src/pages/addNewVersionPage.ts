import { Locator, Page } from '@playwright/test';

export class AddNewVersionPage{

    private readonly page: Page
    private nameInput: Locator
    private descriptionTextArea: Locator
    private saveButton: Locator

    constructor(page: Page){
        this.page = page;
        this.nameInput = this.page.locator("id=name");
        this.descriptionTextArea = this.page.locator("id=description");
        this.saveButton = this.page.locator("input#save");
    }

    public async getAddNewVersionPageTitle(): Promise<string>{
        return await this.page.title();
    }

    public async fillNameInput(text: string): Promise<void>{
        return await this.nameInput.fill(text);
    }

    public async fillDescriptionTextArea(text: string): Promise<void>{
        return await this.descriptionTextArea.fill(text);
    }

    public async clickAtSaveButton(): Promise<void>{
        await this.saveButton.click();
    }
}    