import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://les-petites-trouvailles-5u4p.vercel.app');
  await page.getByRole('link', { name: 'Vêtements' }).click();
  await page.getByRole('link', { name: 'Voir Blue Women\'s Handbag' }).click();
  await page.getByRole('button', { name: 'Écrire un avis' }).click();
  await page.getByRole('button', { name: 'Publier mon avis' }).click();
  await page.getByRole('dialog', { name: 'Blue Women\'s Handbag' }).click();
  await page.getByRole('alert').click();
  await expect(page.getByRole('alert')).toBeVisible();
  await page.getByText('Indiquez votre prénom, une').click();
});