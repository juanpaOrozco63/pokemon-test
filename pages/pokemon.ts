import { expect, Locator, Page } from "@playwright/test";

export class Pokemon {
    private readonly page: Page;
    private readonly locatorItem: Locator;
    private locatorMoves: {[key: string]: Locator};   
    private locatorInputsEvs: {[key: string]: Locator}; 
    private readonly locatorButtonBackTeam: Locator;
    private readonly locatorTotalEvs: Locator;
    private readonly locatorButtonStats: Locator;

    constructor(page:Page){
        this.page = page;
        this.locatorItem = page.locator('input[name="item"]');
        this.createMoves();
        this.createInputsEvs();
        this.locatorButtonBackTeam = page.locator('button[name="back"]');
    }

    createMoves(){
        this.locatorMoves = {
            move1: this.page.locator('input[name="move1"]'),
            move2: this.page.locator('input[name="move2"]'),
            move3: this.page.locator('input[name="move3"]'),
            move4: this.page.locator('input[name="move4"]'),
        }
    }

    createInputsEvs(){
        this.locatorInputsEvs = {
            hp: this.page.locator('input[name="evs.hp"]'),
            atk: this.page.locator('input[name="evs.atk"]'),
            def: this.page.locator('input[name="evs.def"]'),
            spa: this.page.locator('input[name="evs.spa"]'),
            spd: this.page.locator('input[name="evs.spd"]'),
            spe: this.page.locator('input[name="evs.spe"]'),
        }
    }

    async selectItem(item: string){
        await this.locatorItem.click();
        await this.locatorItem.pressSequentially(item)
    }

    async selectMove(moves: string){
        await Object.keys(this.locatorMoves).forEach((key, index) => {
            this.locatorMoves[key].fill(moves[index]);
        });
    }

    async selectEvs(evStats: { [key: string]: string }){
        await this.locatorButtonStats.click();
        for (const [stat, value] of Object.entries(evStats)) {
            await this.locatorInputsEvs[stat].pressSequentially(value, { delay: 100 });
        }
    }

    async validateTotalEvs(totalEvs: string){
        await expect(this.locatorTotalEvs).toContainText('0');
    }
    
    async backToTeam(){
        await this.locatorButtonBackTeam.click();
    }

}