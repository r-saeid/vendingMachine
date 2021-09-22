import express from "express";
import * as controller from "./controller";
import validate from "../utils/validate";
import joiSchema from "./joiSchema";
import authentication from "../middleware/authMiddleeware";

const router = express.Router();

router
  .put("/deposit", authentication, validate(joiSchema), controller.deposit)
  .post("/buy", authentication, validate(joiSchema), controller.buy)
  .get("/reset", authentication, validate(joiSchema), controller.reset);

export default router;
