import { Locator, Page } from '@playwright/test';

export class LoginPage{

    private readonly page: Page;
    private emailInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator

    constructor(page: Page){
        this.page = page;
        this.emailInput = this.page.locator("id=email");
        this.passwordInput = this.page.locator("id=password");
        this.loginButton = this.page.locator("id=login");
    }

    public async getLoginPageTitle(): Promise<string>{
        return await this.page.title();
    }

    public async FillEmailInput(text: string): Promise<void>{
        await this.emailInput.fill(text);
    }

    public async FillPasswordInput(text: string): Promise<void>{
        await this.passwordInput.fill(text);
    }

    public async ClickAtLoginButton(): Promise<void>{
        await this.loginButton.click();
    }
}