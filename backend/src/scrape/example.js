// src/scrape/example.js
const puppeteer = require("puppeteer");

async function scrapeExample() {
  const browser = await puppeteer.launch({
    headless: "new" // pon false si quieres ver el navegador
  });
  const page = await browser.newPage();
  await page.goto("https://example.org", { waitUntil: "domcontentloaded" });

  const title = await page.title();
  const h1 = await page.$eval("h1", el => el.textContent.trim());

  await browser.close();
  return {
    ok: true,
    url: "https://example.org",
    title,
    h1,
    scrapedAt: new Date().toISOString()
  };
}

module.exports = { scrapeExample };
