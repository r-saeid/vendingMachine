import { Router } from "express";
import userRoute from "./user/routes";
import productRoute from "./product/routes";
import purchaseRoute from "./purchase/routes";

const rootRouter = Router();

rootRouter.use("/user", userRoute);
rootRouter.use("/product", productRoute);
rootRouter.use("/purchase", purchaseRoute);

export { rootRouter };
