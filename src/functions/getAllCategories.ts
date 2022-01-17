import { Page } from "puppeteer";
import { CategoryRefrence } from "src/types/Category.interface";

type ReturnType = Promise<CategoryRefrence[]>;

export const getAllCategories = async (page: Page): ReturnType => {
    const result = await page.$$eval('li.s-recipe-lobby__col > div > a', (categories) =>
        // @ts-ignore
        categories.map((category) => category = category.href)
    );
    return result;
};