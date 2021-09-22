import joi from "@hapi/joi";

export default {
  "/deposit": {
    body: {
      deposit: joi.number().positive().required(),
    },
  },
  "/buy": {
    body: {
      productId: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      amount: joi.number(),
    },
  },

  "/reset": {},
};
