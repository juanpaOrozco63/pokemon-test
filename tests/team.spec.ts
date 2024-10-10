import { test } from '@playwright/test';
import { Home } from '../pages/Home';
import { NewTeam } from '../pages/new-team';
import { CreationTeam } from '../pages/creation-team';
import * as dataSuccess from '../data/dataSuccess.json';
import { Pokemon } from '../pages/pokemon';
import * as dataPokemon from '../data/pokemon.json';

test.skip('Abrir Pagina', async ({ page }) => {
  test.slow();
  const home = new Home(page)
  await home.open()
  await home.openInit()
});

test.skip('Crear un equipo', async ({page}) => {
  test.slow();
  const home = new Home(page)
  const newTeam = new NewTeam(page)
  
  await home.open()
  await home.openInit()
  await newTeam.createTeam()
})

test.skip('Crear un equipo y agregar un pokemon', async ({page}) => {
  test.slow();
  const home = new Home(page)
  const newTeam = new NewTeam(page)
  const createTeam = new CreationTeam(page)
  const pokemonStats = new Pokemon(page)
  const pokemon = dataPokemon
  await home.open()
  await home.openInit()
  await newTeam.createTeam()
  await home.open()
  await home.openInit()
  await newTeam.createTeam()
  await createTeam.selectDropDown(pokemon.format, pokemon.tipo)

      await createTeam.addPokemon(pokemon.pokemon.name)
      await pokemonStats.selectItem(pokemon.pokemon.item)
      await pokemonStats.moves(pokemon.pokemon.moves)
      await pokemonStats.stats(pokemon.pokemon.evStats)
      await pokemonStats.bttnBackToTeam()
  
});
test.skip('Crear un equipo, agregar un pokemon y tomar un screenshot de un pokemon', async ({page}) => {
  test.slow();
  const home = new Home(page)
  const newTeam = new NewTeam(page)
  const createTeam = new CreationTeam(page)
  const pokemonStats = new Pokemon(page)
  const pokemon = dataPokemon
  await home.open()
  await home.openInit()
  await newTeam.createTeam()
  await createTeam.selectDropDown(pokemon.format, pokemon.tipo)

      await createTeam.addPokemon(pokemon.pokemon.name)
      await pokemonStats.selectItem(pokemon.pokemon.item)
      await pokemonStats.moves(pokemon.pokemon.moves)
      await pokemonStats.stats(pokemon.pokemon.evStats)
      await page.screenshot({ path:`pokemons/${pokemon.pokemon.name}.png` })
      await pokemonStats.bttnBackToTeam()
  
});

test('Crear y validar un equipo que sea aprobado', async ({ page }) => {
  test.slow()
  const home = new Home(page)
  const newTeam = new NewTeam(page)
  const createTeam = new CreationTeam(page)
  const pokemonStats = new Pokemon(page)

  await home.open()
  await home.openInit()
  await newTeam.createTeam()
  await createTeam.selectDropDown(dataSuccess.format, dataSuccess.tipo)
  for (const pokemon of dataSuccess.pokemon) {

      await createTeam.addPokemon(pokemon.name)
      await pokemonStats.selectItem(pokemon.item)
      await pokemonStats.moves(pokemon.moves)
      await pokemonStats.stats(pokemon.evStats)
      await pokemonStats.verifyEvsEqualToCero()
      await page.screenshot({ path:`pokemons/${pokemon.name}.png` })
      await pokemonStats.bttnBackToTeam()
  }

  await page.screenshot({ path: `team/team.png` })
  await createTeam.validateSuccess(dataSuccess.format, dataSuccess.tipo)
});