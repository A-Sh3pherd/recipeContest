import fs from 'fs/promises';
import { RecipeRefrence } from '../../types/RefrenceToAllRecipes';
export const saveUrls = async (urls: RecipeRefrence[]) => {
    const path = './output/urls.json';
    await fs.writeFile(path, JSON.stringify(urls));
};