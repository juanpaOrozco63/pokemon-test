import { Locator, Page } from "@playwright/test";



export class Pokemon {
    private readonly page: Page;
    private readonly locator: Locator;

    constructor(page:Page){
        this.page = page;
        this.locator = page.locator('');   

    }
    

}