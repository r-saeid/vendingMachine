import joi from "@hapi/joi";

export default {
  "/add": {
    body: {
      amountAvailable: joi.number().required(),
      cost: joi.number().positive().required(),
      productName: joi.string().min(6).max(150).required(),
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
      amountAvailable: joi.number(),
      cost: joi.number(),
      productName: joi.string().min(6).max(150),
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
};
