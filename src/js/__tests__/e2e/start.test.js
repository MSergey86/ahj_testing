import puppeteer from 'puppeteer';

describe('Page start', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test('test', async () => {
    await page.goto('http://localhost:5500');

    await page.waitFor('body');
  });

  test('PaymentSystem', async () => {
    jest.setTimeout(20000);
    await page.goto('http://localhost:5500');

    await page.waitFor('.col-md-5');

    const form = await page.$('.form-group');
    const input = await form.$('.input');
    const submit = await form.$('.submit');

    await input.type('2551382000000013');
    await submit.click();

    await page.waitFor('.card mir');
    await page.waitFor('.card visa card-pale');
  });

  afterEach(async () => {
    await browser.close();
  });
});
