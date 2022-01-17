import puppeteer from 'puppeteer';
interface StartConfig {
    headless?: boolean,
}
export const startPuppeteer = async ({ headless }: StartConfig) => {
    const browser = await puppeteer.launch({
        headless
    });

    const page = await browser.newPage();

    headless && await page.setViewport({
        width: 1200,
        height: 1200
    });

    await page.goto("http://sugat.com/all-recipes");
    await page.waitForTimeout(500);

    return { page, browser };
};