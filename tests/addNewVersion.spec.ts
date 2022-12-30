import { expect, Page, test } from '@playwright/test';
import { Header } from '../src/components/header';
import { InfoBox } from '../src/components/infobox';
import { Menu } from '../src/components/menu';
import RandomData from '../src/test-data/randomData';
import { AddNewVersionPage } from '../src/pages/addNewVersionPage';
import { DashboardPage } from '../src/pages/dashboardPage';
import { HomePage } from '../src/pages/homePage';
import { LoginPage } from '../src/pages/loginPage';
import { VersionsPage } from '../src/pages/versionsPage';
import * as pageData from '../src/test-data/pageData.test-data.json'
import * as appData from '../src/test-data/app.test-data.json'
import * as componentsData from '../src/test-data/componentsData.test-data.json'

let pages: Page[]
let newPage: Page;
let homePage: HomePage;
let loginPage: LoginPage
let dashboardPage: DashboardPage;
let header: Header;
let menu: Menu
let versionsPage: VersionsPage;
let addNewVersionPage: AddNewVersionPage;
let infoBox: InfoBox;
let userName: string;
let password: string;
let name = "Name " + RandomData.randomNumber(10000);
let description = "Description " + RandomData.randomNumber(10000);


test.beforeEach(async ({ page }) => {
    await page.goto(appData.url);
  });

test.afterEach(async ({ page }) => {
    pages = page.context().pages();

    for (let index = 0; index < pages.length; index++) {
        pages[index].close();      
    }
  });

test('Defined user is able to add new version to existing project', async ({ page }) => {

    homePage = new HomePage(page);
    expect(await homePage.getHomePageTitle()).toBe(pageData.titles.homepage);
    userName = await homePage.getUserNameValue();
    password = await homePage.getPasswordValue();
    await homePage.clickAtDemoButton();

    await page.context().waitForEvent('page');
    pages = page.context().pages();
    newPage = pages[1];

    loginPage = new LoginPage(newPage);
    expect(await loginPage.getLoginPageTitle()).toBe(pageData.titles.loginpage);
    await loginPage.FillEmailInput(userName)
    await loginPage.FillPasswordInput(password);
    await loginPage.ClickAtLoginButton();

    dashboardPage = new DashboardPage(newPage);
    expect(await dashboardPage.getDashboardPageTitle()).toBe(pageData.titles.dashboardpage);
    
    header = new Header(newPage);
    await header.selectActiveProjectOption("PROJEKT_DK");

    menu = new Menu(newPage);
    await menu.ClickAtItemInSideMenu("Versions");

    versionsPage = new VersionsPage(newPage);
    expect(await versionsPage.getVersionsPageTitle()).toBe(pageData.titles.versionspage);
    await versionsPage.clickAtAddNewVersionButton();

    addNewVersionPage = new AddNewVersionPage(newPage);
    expect(await addNewVersionPage.getAddNewVersionPageTitle()).toBe(pageData.titles.addnewversionpage);
    await addNewVersionPage.fillNameInput(name);
    await addNewVersionPage.fillDescriptionTextArea(description);
    await addNewVersionPage.clickAtSaveButton();

    infoBox = new InfoBox(newPage);
    expect(await infoBox.getInfoParagraphValue()).toBe(componentsData.infobox.text);
    await infoBox.clickAtCloseButton();
    
    await versionsPage.fillSearchInput(name);
    await versionsPage.clickAtSearchButton();

    let expectedRow:string[] = [name, "0", "0", ""];
    expect(await versionsPage.getVersionValue(1)).toStrictEqual(expectedRow)
  });