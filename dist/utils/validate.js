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
const joi_1 = __importDefault(require("@hapi/joi"));
const validate = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const path = req.route.path;
            const routeObject = schema[path];
            if (routeObject.body) {
                const validateSchema = joi_1.default.object(routeObject.body);
                const result = yield validateSchema.validate(req.body);
                if (result.error) {
                    res.status(500).json({ data: (_a = result.error) === null || _a === void 0 ? void 0 : _a.details });
                }
                // if (result.errors) {
                //   res.status(500).json({ data: result.errors?.details });
                // }
            }
            if (routeObject.params) {
                const validateSchema = joi_1.default.object(routeObject.params);
                const result = yield validateSchema.validate(req.params);
                if (result.error) {
                    res.status(500).json({ data: (_b = result.error) === null || _b === void 0 ? void 0 : _b.details });
                }
                // if (result.errors) {
                //   res.status(500).json({ data: result.errors?.details });
                // }
            }
            if (routeObject.query) {
                const validateSchema = joi_1.default.object(routeObject.query);
                const result = yield validateSchema.validate(req.query);
                if (result.error) {
                    res.status(500).json({ data: (_c = result.error) === null || _c === void 0 ? void 0 : _c.details });
                }
                // if (result.errors) {
                //   res.status(500).json({ data: result.errors?.details });
                // }
            }
            next();
        }
        catch (error) {
            res.status(500).json({ data: error });
        }
    });
};
exports.default = validate;
