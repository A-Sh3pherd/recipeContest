import { Browser } from "puppeteer";
import { RecipeRefrence } from "../../types/Category.interface";
import { getRefrenceToAllRecipesInPage } from "../recipes/getRefrenceToAllRecipesInPage";

interface CreatePromiseOptions {
    baseUrl: string;
    browser: Browser;
    pageNumber: number;
    initialArray: RecipeRefrence[];
}
export const createPromise = async (options: CreatePromiseOptions) => {
    const paginatedUrl = `${ options.baseUrl }page/${ options.pageNumber }`;

    const newPage = await options.browser.newPage();
    newPage.setDefaultNavigationTimeout(0);

    await newPage.goto(paginatedUrl);

    const moreRefs = await getRefrenceToAllRecipesInPage(newPage);

    options.initialArray.push(...moreRefs);

    await newPage.close();

    return;
};