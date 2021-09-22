"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller = __importStar(require("./controller"));
const validate_1 = __importDefault(require("../utils/validate"));
const joiSchema_1 = __importDefault(require("./joiSchema"));
const authMiddleeware_1 = __importDefault(require("../middleware/authMiddleeware"));
// router.use(validate(joiSchema));
const router = express_1.default.Router();
router
    .post("/add", validate_1.default(joiSchema_1.default), controller.add)
    .put("/edit/:id", authMiddleeware_1.default, validate_1.default(joiSchema_1.default), controller.edit)
    .get("/list", authMiddleeware_1.default, validate_1.default(joiSchema_1.default), controller.list)
    .get("/detail/:id", authMiddleeware_1.default, validate_1.default(joiSchema_1.default), controller.detail)
    .delete("/delete/:id", authMiddleeware_1.default, validate_1.default(joiSchema_1.default), controller.del)
    .post("/login", validate_1.default(joiSchema_1.default), controller.login);
exports.default = router;
