import { Page } from "puppeteer";
import { ClassNames } from "../../types/ClassNames.interface";

type ReturnType = Promise<number>;

export const checkIfPaginationExist = async (page: Page): ReturnType => {
    const { pagination } = ClassNames;

    const exist = await page.$(`${ pagination }`);

    if (!exist) {
        return 0;
    } else {
        return page.evaluate(() => {
            const paginationSection = Array.from(document.querySelectorAll('a.page-numbers'));
            // @ts-ignore
            return parseInt(paginationSection.at(-2).textContent);
        });

    }
}; 