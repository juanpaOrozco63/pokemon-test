import { Locator, Page } from "@playwright/test";

export class Home {
  private readonly page: Page;
  private readonly locator: Locator;
  private readonly url: string = "https://play.pokemonshowdown.com";
  private readonly nameButton: string = "Teambuilder";

  constructor(page: Page) {
    this.page = page;
    this.locator = page.getByRole("button", { name: this.nameButton });
  }

  async open() {
    await this.page.goto(this.url);
  }
  async openInit() {
    await this.locator.click();
  }
}
