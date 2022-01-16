import { Page } from "puppeteer";
import { RecipeRefrence } from "../../types/Category.interface";
export const getRefrenceToAllRecipesInPage = async (page: Page) => {
    const result = await page.evaluate(() => {
        const recipes = document.querySelectorAll('.s-recipe-category__col > a');
        const allRecipes: RecipeRefrence[] = [];

        recipes.forEach(recipe => allRecipes.push(decodeURIComponent(
            // @ts-ignore;
            recipe.href
        )));

        return allRecipes;
    });

    return result;
};