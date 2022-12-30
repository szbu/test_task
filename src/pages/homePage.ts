import { Locator, Page } from '@playwright/test';

export class HomePage{

    private readonly page: Page;
    private userDataDescriptionParagraph: Locator;
    private demoButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.userDataDescriptionParagraph = this.page.locator("div.description p", { hasText: 'Aby zalogować się do aplikacji użyj:'});
        this.demoButton = this.page.locator("css=a[href='http://demo.testarena.pl/']");   
     }

    public async getHomePageTitle(): Promise<string>{
        return await this.page.title();
    }

    public async getUserNameValue(): Promise<string>{
        var userDataDescriptionParagraphValue = await this.userDataDescriptionParagraph.innerText();
        return userDataDescriptionParagraphValue
            .substring(
            userDataDescriptionParagraphValue.lastIndexOf('Login: ') + 6, 
            userDataDescriptionParagraphValue.indexOf('Hasło:')
            )    
            .replace('\n','')
            .trim();
    };

    public async getPasswordValue(): Promise<string>{
        var userDataDescriptionParagraphValue = await this.userDataDescriptionParagraph.innerText();
        return userDataDescriptionParagraphValue
            .substring(
            userDataDescriptionParagraphValue.lastIndexOf('Hasło: ') + 6, 
            )    
            .replace('\n','')
            .trim();
    };

    public async clickAtDemoButton(): Promise<void>{
        await this.demoButton.click();
    }
};