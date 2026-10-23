import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://les-petites-trouvailles-5u4p.vercel.app');
  await page.getByRole('link', { name: 'Vêtements' }).click();
  await page.getByRole('link', { name: 'Voir Blue Women\'s Handbag' }).click();
  await page.getByRole('button', { name: 'Écrire un avis' }).click();
  await page.getByRole('textbox', { name: 'Votre prénom' }).click();
  await page.getByRole('textbox', { name: 'Votre prénom' }).fill('Annabelle');
  await page.getByRole('button', { name: '5 étoiles' }).click();
  await page.getByRole('textbox', { name: 'Votre commentaire' }).click();
  await page.getByRole('textbox', { name: 'Votre commentaire' }).fill('super article');
  await page.getByRole('button', { name: 'Publier mon avis' }).click();
  await page.getByRole('region', { name: 'Liste des avis' }).click();
});
