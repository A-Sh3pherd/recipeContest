import * as fs from 'fs/promises';
import { Recipe } from '../types/Recipe.interface';
export const saveRecipes = async (data: Recipe[]) => {
    // await fs.writeFile('./data.json', JSON.stringify(data.flat()));

    for (const recipe of data) {
        const { name, cookingDuration, amountOfDishes, Diet, ingredients, howToMake } = recipe;

        const nameTemplate = `\nשם המתכון: ${ name }\n`;
        const cookingDurationTemplate = `\nזמן הכנה: ${ cookingDuration }\n`;
        const amountOfDishesTemplate = amountOfDishes ? `\nמספר מנות: ${ amountOfDishes }\n` : '\n';
        const kosherOrWhateverTemplate = `\n${ Diet }\n`;
        const ingredientsTemplate = `\n${ ingredients }\n`;
        const howToMakeTemplate = `\nאופן ההכנה:\n${ howToMake }\n`;

        const template =
            nameTemplate +
            cookingDurationTemplate +
            amountOfDishesTemplate +
            kosherOrWhateverTemplate +
            ingredientsTemplate +
            howToMakeTemplate;


        await fs.writeFile(`./Recipes/${ name }.txt`, template)
            .catch(e => console.log('Error while saving page: ', e));
    }
};