import joi from "@hapi/joi";
import { roles } from "../utils/customeTypes";

export default {
  "/add": {
    body: {
      username: joi.string().min(6).max(150).required(),
      password: joi.string().min(6).max(150).required(),
      role: joi
        .string()
        .valid(...Object.values(roles))
        .required(),
    },
  },
  "/edit/:id": {
    params: {
      id: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    },
    body: {
      username: joi.string().min(6).max(150),
      password: joi.string().min(6).max(150),
      role: joi.string().valid(...Object.values(roles)),
    },
  },

  "/list": {},

  "/detail/:id": {
    params: {
      id: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    },
  },

  "/delete/:id": {
    params: {
      id: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    },
  },
  "/login": {
    body: {
      username: joi.string().min(6).max(150).required(),
      password: joi.string().min(6).max(150).required(),
    },
  },
};
