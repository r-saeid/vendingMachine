import express from "express";
import * as controller from "./controller";
import validate from "../utils/validate";
import joiSchema from "./joiSchema";
import authentication from "../middleware/authMiddleeware";

// router.use(validate(joiSchema));

const router = express.Router();
router
  .post("/add", validate(joiSchema), controller.add)
  .put("/edit/:id", authentication, validate(joiSchema), controller.edit)
  .get("/list", authentication, validate(joiSchema), controller.list)
  .get("/detail/:id", authentication, validate(joiSchema), controller.detail)
  .delete("/delete/:id", authentication, validate(joiSchema), controller.del)
  .post("/login", validate(joiSchema), controller.login);
export default router;
