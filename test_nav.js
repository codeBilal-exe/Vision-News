const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:5500/index.html', { waitUntil: 'networkidle' });
    await page.click('.mobile-menu-toggle');
    await page.waitForTimeout(500);

    const navLinks = await page.$$eval('.nav-links a', els => els.map(el => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return { text: el.innerText, x: rect.x, y: rect.y, width: rect.width, height: rect.height, display: style.display, visibility: style.visibility };
    }));

    console.log(JSON.stringify(navLinks, null, 2));
    await page.screenshot({ path: 'mobile_nav.png' });
    await browser.close();
})();
