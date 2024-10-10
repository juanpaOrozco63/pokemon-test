import { Locator, Page } from "@playwright/test";



export class NewTeam {
    //Pages
    private readonly page: Page;
    //Locators
    private readonly locatorNewTeam: Locator;
    //Texts
    private readonly nameButtonTeam: string = "New Team";

    constructor(page:Page) {
        this.page = page;
        this.locatorNewTeam = page.getByRole('button', {name:this.nameButtonTeam});   
    }

    async createTeam () {
        await this.locatorNewTeam.first().click();
    }
}