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
exports.handlePageLocalization = void 0;
const lodash_1 = require("lodash");
const checkIfMorePages_pagination_1 = require("../functions/pagination/checkIfMorePages.pagination");
const checkIfPaginationExist_1 = require("../functions/pagination/checkIfPaginationExist");
const ClassNames_interface_1 = require("../types/ClassNames.interface");
const handlePageLocalization = (page, categories) => __awaiter(void 0, void 0, void 0, function* () {
    (0, lodash_1.map)(categories, ({ url }) => __awaiter(void 0, void 0, void 0, function* () {
        yield page.goto(url);
        yield page.click(ClassNames_interface_1.ClassNames.allRecipesInCategory, { clickCount: 2 });
        yield page.waitForTimeout(500);
        const paginationExist = yield (0, checkIfPaginationExist_1.checkIfPaginationExist)(page);
        if (paginationExist) {
            const morePages = yield (0, checkIfMorePages_pagination_1.checkIfMorePages)(page);
            console.log('More pages exist');
        }
        else {
        }
    }));
});
exports.handlePageLocalization = handlePageLocalization;
//# sourceMappingURL=handlePageLocalization.js.map