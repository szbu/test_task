import { Page, Locator } from '@playwright/test';

export class InfoBox{
    
    private readonly page: Page;
    private closeButton: Locator;
    private infoParagraph: Locator;

    constructor(page: Page){
        this.page = page;
        this.closeButton =this.page.locator("div.j_close_button");
        this.infoParagraph =this.page.locator("div#j_info_box p");
    }

    public async clickAtCloseButton(): Promise<void>{
        await this.closeButton.click()
    }

    public async getInfoParagraphValue(): Promise<string>{
        return await this.infoParagraph.innerText();
    }
}