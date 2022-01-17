import * as fs from 'fs/promises';
// import path from 'path';
import { Recipe } from '../../types/Recipe.interface';
export const saveRecipes = async (data: Recipe[]) => {

    for (const recipe of data) {
        const { name, cookingDuration, amountOfDishes, Diet, ingredients, howToMake } = recipe;
        const savedFilePath = `./output/recipes/${ name }.txt`;

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


        await fs.writeFile(savedFilePath, template)
            .catch(e => console.log('Error while saving page: ', e));
    }
};
