// PokemonDetailsPage.ts
import { Page, Locator, expect } from "@playwright/test";

export class Pokemon {
  //Pages
  private readonly page: Page;
  //Locators
  readonly locatorItem: Locator;
  readonly locatorAbility: Locator;
  readonly locatorInputs: { [key: string]: Locator };
  readonly locatorStats: Locator;
  readonly locatorBackToTeam: Locator;
  readonly locatorMoves: { [key: string]: Locator };
  readonly locatorTotalEvs: Locator;
  //Texts
  private readonly nameButtonBuilder: string = "Teambuilder";

  constructor(page: Page) {
    this.page = page;
    this.locatorItem = page.locator('input[name="item"]');
    this.locatorAbility = page.locator('input[name="ability"]');
    this.locatorMoves = {
      move1: page.locator('input[name="move1"]'),
      move2: page.locator('input[name="move2"]'),
      move3: page.locator('input[name="move3"]'),
      move4: page.locator('input[name="move4"]'),
    };
    this.locatorInputs = {
      hp: page.locator('input[name="stat-hp"]'),
      atk: page.locator('input[name="stat-atk"]'),
      def: page.locator('input[name="stat-def"]'),
      spa: page.locator('input[name="stat-spa"]'),
      spd: page.locator('input[name="stat-spd"]'),
      spe: page.locator('input[name="stat-spe"]'),
    };
    this.locatorStats = page.locator('button[name="stats"]');
    this.locatorBackToTeam = page.locator('button[name="back"]');
    this.locatorTotalEvs = page.locator("div.totalev em");
  }

  async selectItem(item: string) {
    await this.locatorItem.click();
    await this.locatorItem.pressSequentially(item);
  }

  async bttnBackToTeam() {
    await this.locatorBackToTeam.click();
  }

  async selectAbility(ability: string) {
    await this.locatorAbility.click();
    await this.locatorAbility.pressSequentially(ability);
  }

  async stats(stats: { [key: string]: string }) {
    await this.locatorStats.click();
    for (const [stat, value] of Object.entries(stats)) {
      await this.locatorInputs[stat].pressSequentially(value, { delay: 100 });
    }
  }

  async verifyEvsEqualToCero() {
    await expect(this.locatorTotalEvs).toContainText("0");
  }

  async moves(moves: { [key: string]: string }) {
    for (const [move, value] of Object.entries(moves)) {
      await this.locatorMoves[move].pressSequentially(value, { delay: 100 });
    }
  }

  
}
