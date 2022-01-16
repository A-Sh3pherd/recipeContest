"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const getAllCategories_1 = require("./functions/getAllCategories");
const getAllRecipesInPage_1 = require("./functions/recipes/getAllRecipesInPage");
const ClassNames_interface_1 = require("./types/ClassNames.interface");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({
        devtools: false
    });
    const page = yield browser.newPage();
    yield page.setViewport({
        width: 1200,
        height: 1200
    });
    yield page.goto("http://sugat.com/all-recipes");
    yield page.waitForTimeout(500);
    const allCategories = yield (0, getAllCategories_1.getAllCategories)(page);
    yield page.goto(allCategories[5].url);
    yield page.click(ClassNames_interface_1.ClassNames.allRecipesInCategory, { clickCount: 2 });
    yield page.waitForTimeout(500);
    const allRecipesInPage = yield (0, getAllRecipesInPage_1.getAllRecipesInPage)(page);
    const formattedRecipesArr = [];
    for (const recipe of allRecipesInPage) {
        yield page.goto(recipe.url);
        yield page.waitForTimeout(500);
        const stats = yield page.$$eval('.b-calories__dd', (threeOrFour) => {
            if (threeOrFour.length === 3) {
                return { amountOfDishes: 'afdkljsldkfajdfsakljfsadlkjfdsljk', diet: '', difficulty: '', duration: '' };
            }
            else {
                return {
                    duration: threeOrFour[0].textContent,
                    difficulty: threeOrFour[1].textContent,
                    amountOfDishes: threeOrFour[2].textContent,
                    diet: threeOrFour[3].textContent ? threeOrFour[3].textContent : 'בשרי'
                };
            }
        });
        console.log(stats);
        formattedRecipesArr.push({
            name: recipe.name,
            Diet: stats.diet,
            amountOfDishes: stats.amountOfDishes,
            cookingDuration: stats.duration,
        });
    }
    console.log(chalk_1.default.yellow('Oh baby im done now :)'));
}))();
//# sourceMappingURL=app.js.map