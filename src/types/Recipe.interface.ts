// Interface for a recipe
export interface Recipe {
    name: string;
    cookingDuration: string;
    amountOfDishes?: string;
    Diet?: Diet,
    ingredients: string;
    howToMake: string;
}

// Diet
type Diet = 'צמחוני' | 'פרווה' | 'בשרי' | 'חלבי' | 'טבעוני' | 'איןליפאקינגמושגכוסאומוהעולם';