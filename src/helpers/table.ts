import { Page, Locator } from '@playwright/test';
import { url } from 'inspector';

export class Table{
    
    private readonly page: Page
    private rowValues: string[] = []; 
    
    constructor(page: Page){
        this.page = page;
    }

    public async getRowValues(rowNumber: number): Promise<string[]>{
              
        let locator = this.page.locator("table");
        let rows = locator.locator("tr");
        let row = rows.nth(rowNumber);
        let rowCells = row.locator("td");
        let rowCellsCount = await rowCells.count();

        for (let index = 0; index < rowCellsCount; index++) {
            let rowCellDataRaw = await rowCells.nth(index).innerText();
            let rowCellData = rowCellDataRaw.replace("\n","");
            this.rowValues.push(rowCellData) ;         
        }
        return this.rowValues;
    }
}