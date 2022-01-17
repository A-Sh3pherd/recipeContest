import chalk from 'chalk';
import 'dotenv/config';
import { chunk } from 'lodash';
import ora from 'ora';
import { getAllCategories } from './functions/getAllCategories';
import { startPuppeteer } from './functions/startPuppeteer';
import { getRecipeDataFromPage } from './handlers/getRecipeDataFromPage';
import { getRefrenceToAllRecipesInCategoryPage } from './handlers/getRefrenceToAllRecipesInCategory';
import { CategoryRefrence } from './types/Category.interface';
import { Recipe } from './types/Recipe.interface';
import { RefrenceToAllRecipes } from './types/RefrenceToAllRecipes';
import { getMethodDuration } from './utils/getMethodDuration.util';
import { getStartTime } from './utils/getStartTime.util';
import { saveRecipes } from './utils/fs/saveRecipes';
import { getBrokenUrls } from './utils/fs/getBrokenUrls';
import { updateBrokenUrls } from './utils/fs/updateBrokenUrls';
import { saveUrls } from './utils/fs/saveUrls';

/*
* Flow is as below:
---------------------------------------------------------------------
* Prelaunch:
- insert CHUNK_SIZE to the .env file (optional), default is 10
- run yarn || npm i
- run ts-node src/app
---------------------------------------------------------------------
*1- Start the timer and get to the main page

*2- We get a refrence to all categories

*3- We enter each category, and get refrence for all the recipes in category encluding pagination

*4- We map all the refrences to the recipes in to 1 array of refrences to a recipe

*5- In order for us not to kill our computer, We chunk each recipe to an amount YOU provide,
*|- and then get recipes from each chunk.

* Final step -> Create a file for each recipe, and log the duration
---------------------------------------------------------------------
*/

const { white, red, green, yellow } = chalk;

(async () => {
    console.log(`Chunk size: ${ green(`${ process.env.CHUNK_SIZE }` || 'env was not provided!!!') }`);
    // Step 1
    const timer = getStartTime();
    const brokenUrls = await getBrokenUrls();

    const { page, browser } = await startPuppeteer({}); // Look at the function to see the options
    // Step 2
    const refrecneToAllCategories: CategoryRefrence[] = await getAllCategories(page);
    // Step 3
    const refrenceToAllRecipes: RefrenceToAllRecipes[] = [];

    const step3 = ora().start();

    for (const category of refrecneToAllCategories) {
        step3.text = 'Gettings a refrence to all categories';
        // Start new page
        const newPage = await browser.newPage();
        // Preventing timeout errors in advance (thank yourself later)
        newPage.setDefaultNavigationTimeout(0);
        // Navigating to a category
        await newPage.goto(category.url);
        // Get ref to all category in page
        const reference = await getRefrenceToAllRecipesInCategoryPage(newPage, browser, category);

        refrenceToAllRecipes.push(reference);
        await newPage.close();
    }
    step3.succeed('Got a reference to all categories');

    const step4 = ora('Mapping recipe references').start();
    // Step 4
    const recipesRef = refrenceToAllRecipes.map(({ recipesRefrence }) => recipesRefrence).flat();
    step4.succeed('Finished mapping recipe references');

    // Step 5
    const chunkedRecipes = chunk(recipesRef, +process.env.CHUNK_SIZE! || 10);

    const recipesFromRefrencedCategory: Recipe[] = [];

    const step5 = ora().start();

    for (const chunk of chunkedRecipes) {
        step5.text = `Looping chunk: ${ green(chunkedRecipes.indexOf(chunk) + 1) }/${ yellow(chunkedRecipes.length) }\n`;

        await Promise.all(chunk.map(async (recipe): Promise<void> => {

            const newPage = await browser.newPage();

            await newPage.goto(recipe);
            await newPage.waitForTimeout(500);
            // Check if it's a broken url
            if (brokenUrls.includes(newPage.url())) {
                await newPage.close();
                return;
            };
            try {
                const data = await getRecipeDataFromPage(newPage);
                if (data) {
                    // @ts-ignore
                    recipesFromRefrencedCategory.push(data);
                    await newPage.close();
                    return;
                } else {
                    brokenUrls.push(newPage.url());
                    await newPage.close();
                    return;
                }
            } catch (e) {
                console.log(red(`page does not have needed parameters url: ${ newPage.url() }`));
                await newPage.close();
            }
        }));
    }
    step5.succeed(`Done with all chunks`);
    // Final step
    await browser.close();

    await saveRecipes(recipesFromRefrencedCategory);
    await updateBrokenUrls(await getBrokenUrls());
    await saveUrls(recipesRef);

    ora().succeed(`Process took: ${ getMethodDuration(timer) }`);
    console.log(white('========================'));
    ;
})();