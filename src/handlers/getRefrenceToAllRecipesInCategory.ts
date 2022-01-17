import 'dotenv/config';
import { chunk } from "lodash";
import { Browser, Page } from "puppeteer";
import { checkIfPaginationExist } from "../functions/pagination/checkIfPaginationExist";
import { createPromise } from "../functions/pagination/createPromise.pagination";
import { getRefrenceToAllRecipesInPage } from "../functions/recipes/getRefrenceToAllRecipesInPage";
import { CategoryRefrence } from "../types/Category.interface";
import { RecipeRefrence, RefrenceToAllRecipes } from "../types/RefrenceToAllRecipes";

// Getting a refrence to all of the recipes in a category
export const getRefrenceToAllRecipesInCategoryPage = async (page: Page, browser: Browser, category: CategoryRefrence) => {

    const exist = await checkIfPaginationExist(page);

    const reference: RefrenceToAllRecipes = {
        categoryName: category.name,
        recipesRefrence: await getRefrenceToAllRecipesInPage(page),
        isPaginationExist: exist
    };

    if (!exist) return reference;

    const promises: any[] = [];

    // Create a promise for each url\
    for (let i = 2; i < exist; i++) {
        const promise = () => createPromise({
            pageNumber: i,
            browser,
            baseUrl: category.url,
            initialArray: reference.recipesRefrence
        });
        promises.push(promise);
    }
    const chunkedPromises = chunk(promises, 15);
    // Looping each chunk
    const moreRefs: RecipeRefrence[] = [];

    for (const promises of chunkedPromises) {
        await Promise.all(
            promises.map((promise) => promise())
        );
    }
    reference.recipesRefrence.push(...moreRefs);

    // console.log('\n' + chalk.red(category.name) + ': ' + chalk.yellow(reference.recipesRefrence.flat().length));

    return reference;
};

