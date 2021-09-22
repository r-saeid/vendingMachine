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
const dotenv_1 = __importDefault(require("dotenv"));
class SingleRun {
    constructor() {
        this.envConfig = () => {
            if (process.env.RUNNINGON == "production") {
                dotenv_1.default.config({
                    path: `${process.cwd()}/src/utils/envFiles/.production.env`,
                });
            }
            else {
                dotenv_1.default.config({
                    path: `${process.cwd()}/src/utils/envFiles/.local.env`,
                });
            }
        };
    }
    static runAllMethods() {
        return __awaiter(this, void 0, void 0, function* () {
            const singleRun = new SingleRun();
            singleRun.envConfig();
        });
    }
}
exports.default = SingleRun.runAllMethods;
