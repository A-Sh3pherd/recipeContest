import { Page } from "puppeteer";
// Todo

export const getRecipeDataFromPage = async (page: Page) => page.evaluate(() => {
    // @ts-ignore
    const name = document.querySelector('.b-main-title').innerText;
    const elementsArr = Array.from(document.querySelectorAll('.b-calories__li > .b-calories__dd'));

    const ingredients = Array.from(document.querySelectorAll('.b-contain'))
        // @ts-ignore
        .map((child) => child.innerText.includes('קרא עוד')
            // @ts-ignore
            ? child.innerText.replace('קרא עוד', '')
            // @ts-ignore
            : child.innerText)
        .join();

    const howToMake = Array.from(document.querySelectorAll('.l-steps__ul'))
        // @ts-ignore
        .map(arr => arr.innerText).join();

    if (elementsArr.length <= 3) {
        if (elementsArr.length === 2) return;
        return {
            name,
            // @ts-ignore
            cookingDuration: document.querySelector('.b-calories__dd').innderText,
            difficulty: elementsArr[ 1 ].textContent,
            Diet: elementsArr[ 2 ].textContent,
            ingredients: ingredients,
            howToMake
        };
    } else {
        return {
            name,
            // @ts-ignore
            cookingDuration: document.querySelector('.b-calories__dd').textContent,
            difficulty: elementsArr[ 1 ].textContent,
            // @ts-ignore
            amountOfDishes: elementsArr[ 2 ].textContent,
            Diet: elementsArr[ 3 ].textContent,
            ingredients: ingredients,
            howToMake
        };
    }
});