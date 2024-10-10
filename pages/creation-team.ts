import { expect, Locator, Page } from "@playwright/test";

export class CreationTeam {
  //Page
  private readonly page: Page;
  //Locators
  private readonly locatorFormatDropDown: Locator;
  private readonly locatorFormatSearchInput: Locator;
  private readonly locatorInputAddPokemon: Locator;
  private readonly locatorPokemonInput: Locator;
  private readonly locatorValidateButtton: Locator;
  //Texts
  private readonly nameButtonFormat: string = "Select a format";
  private readonly nameButtonInputSearch: string = "Search formats";
  private readonly nameButtonAddPokemon: string = "Add Pokémon";
  private readonly inputNamePokemon: string = 'input[name="pokemon"]';
  private readonly inputButtonValidate: string = 'button[name="validate"]';
  constructor(page: Page) {
    this.page = page;

    this.locatorFormatDropDown = page.getByRole("button", {
      name: this.nameButtonFormat,
    });
    this.locatorFormatSearchInput = page.getByPlaceholder(
      this.nameButtonInputSearch
    );
    this.locatorInputAddPokemon = page.getByRole("button", {
      name: this.nameButtonAddPokemon,
    });
    this.locatorPokemonInput = page.locator(this.inputNamePokemon);
    this.locatorValidateButtton = page.locator(this.inputButtonValidate);
  }
  async selectDropDown(name: string, type: string) {
    await this.locatorFormatDropDown.click();
    await this.locatorFormatSearchInput.pressSequentially(name, { delay: 100 });
    await this.page.locator(`button:has-text("${type}")`).click();
  }
  async addPokemon(name: string) {
    await this.locatorInputAddPokemon.click();
    await this.locatorPokemonInput.click();
    await this.locatorPokemonInput.pressSequentially(name, { delay: 50 });
    await this.page.locator(`a[data-entry="pokemon|${name}"]`).click();
  }

  async validateSuccess(name: string, type: string) {
    await this.locatorValidateButtton.click();
    await expect(this.page.locator("body")).toContainText(
      `Your team is valid for [${type}] ${name}.`
    );
  }

}
