import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser;
  let page;
  let server;
  const baseUrl = 'http://localhost:8080';

  beforeAll(async () => {
    server = fork('./src/e2e.server.js');
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('Mir card', async () => {
    jest.setTimeout(20000);
    await page.goto(baseUrl);
    const form = await page.$('.form-inline');
    const input = await form.$('.form-control');
    await input.type('2551382000000013');
    const qtyPaleCards = await page.evaluate(() => document.getElementsByClassName('card-pale').length);
    const mir = await page.evaluate(() => document.getElementsByClassName('mir')[0].className);
    await expect(mir).toBe('card mir');
    await expect(qtyPaleCards).toEqual(6);
  });

  test('Visa card', async () => {
    jest.setTimeout(20000);
    await page.goto(baseUrl);
    const form = await page.$('.form-inline');
    const input = await form.$('.form-control');
    await input.type('411111123456789');
    const qtyPaleCards = await page.evaluate(() => document.getElementsByClassName('card-pale').length);
    const visa = await page.evaluate(() => document.getElementsByClassName('visa')[0].className);
    await expect(visa).toBe('card visa');
    await expect(qtyPaleCards).toEqual(6);
  });

  test('Mastercard card', async () => {
    jest.setTimeout(20000);
    await page.goto(baseUrl);
    const form = await page.$('.form-inline');
    const input = await form.$('.form-control');
    await input.type('5105109876543214');
    const qtyPaleCards = await page.evaluate(() => document.getElementsByClassName('card-pale').length);
    const mastercard = await page.evaluate(() => document.getElementsByClassName('mastercard')[0].className);
    await expect(mastercard).toBe('card mastercard');
    await expect(qtyPaleCards).toEqual(6);
  });
});
