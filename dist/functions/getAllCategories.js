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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = void 0;
const getAllCategories = (page) => __awaiter(void 0, void 0, void 0, function* () {
    return page.$$eval('li.s-recipe-lobby__col > div > a', (categories) => categories.map((category) => category = { name: category.href.split('recipes_cat/')[1].split('/')[0], url: category.href }));
});
exports.getAllCategories = getAllCategories;
//# sourceMappingURL=getAllCategories.js.map