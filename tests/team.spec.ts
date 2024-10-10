import { test, expect } from '@playwright/test';
import { Home } from '../pages/Home';


test('Crear y validar un equipo', async ({ page }) => {
  const home = new Home(page)
  await home.open();


});