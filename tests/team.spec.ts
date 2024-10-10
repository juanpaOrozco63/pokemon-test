import { test, expect } from '@playwright/test';
import { Home } from '../pages/Home';
import { NewTeam } from '../pages/new-team';


test('Crear y validar un equipo', async ({ page }) => {
  const home = new Home(page)
  const newTeam = new NewTeam(page);
  await home.open();

});