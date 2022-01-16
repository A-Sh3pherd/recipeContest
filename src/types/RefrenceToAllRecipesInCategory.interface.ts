import { RecipeRefrence } from "./Category.interface";

export interface RefrenceToAllRecipes {
    categoryName: string;
    recipesRefrence: RecipeRefrence[];
    isPaginationExist: number;
}