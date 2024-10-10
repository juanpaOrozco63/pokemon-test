import { Locator, Page } from "@playwright/test";

export class Home {
  //Pages
  private readonly page: Page;
  //Locators
  private readonly locatorTeamBuilder: Locator;
  //Texts
  private readonly url: string = "https://play.pokemonshowdown.com";
  private readonly nameButtonBuilder: string = "Teambuilder";

  constructor(page: Page) {
    this.page = page;
    this.locatorTeamBuilder = page.getByRole("button", {
      name: this.nameButtonBuilder,
    });
  }
  async open() {
    await this.page.goto(this.url);
  }
  async openInit() {
    await this.locatorTeamBuilder.click();
  }
}
