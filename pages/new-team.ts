import { Locator, Page } from "@playwright/test";



export class NewTeam {
    private readonly page: Page;
    private readonly locatorNewTeam: Locator;
    private readonly nameButtonTeam: string = "New Team";

    constructor(page:Page) {
        this.page = page;
        this.locatorNewTeam = page.getByRole('button', {name:this.nameButtonTeam});   
    }

    async createTeam () {
        await this.locatorNewTeam.first().click();
    }
}