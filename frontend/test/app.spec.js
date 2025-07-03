import { test, expect } from '@playwright/test';

test('devrait permettre la connexion', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.fill('input[placeholder="Nom d\'utilisateur"]', 'admin');
  await page.fill('input[placeholder="Mot de passe"]', 'admin123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:5173/vehicles');
});

test('devrait afficher la liste des véhicules', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.fill('input[placeholder="Nom d\'utilisateur"]', 'admin');
  await page.fill('input[placeholder="Mot de passe"]', 'admin123');
  await page.click('button[type="submit"]');
  await expect(page.locator('ul')).toContainText('Toyota Camry (2020) - $50');
});

test('devrait ajouter un utilisateur', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.fill('input[placeholder="Nom d\'utilisateur"]', 'admin');
  await page.fill('input[placeholder="Mot de passe"]', 'admin123');
  await page.click('button[type="submit"]');
  await page.goto('http://localhost:5173/users');
  await page.fill('input[placeholder="Nom d\'utilisateur"]', 'newuser');
  await page.fill('input[placeholder="Mot de passe"]', 'newuser123');
  await page.fill('input[placeholder="Email"]', 'newuser@propelize.com');
  await page.click('button[type="submit"]');
  await expect(page.locator('ul')).toContainText('newuser - newuser@propelize.com');
});