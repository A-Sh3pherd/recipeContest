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

    const thisPageRefs = await getRefrenceToAllRecipesInPage(page);
    const exist = await checkIfPaginationExist(page);

    if (!exist) return thisPageRefs;

    const references: RefrenceToAllRecipes = [];
    references.push(...thisPageRefs.flat());

    if (!exist) return references;

    const promises: any[] = [];

    // Create a promise for each url\
    for (let i = 2; i < exist; i++) {
        const promise = () => createPromise({
            pageNumber: i,
            browser,
            baseUrl: category,
            initialArray: references
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
    references.push(...moreRefs);

    // console.log('\n' + chalk.red(category.name) + ': ' + chalk.yellow(reference.recipesRefrence.flat().length));

    return references;
};

