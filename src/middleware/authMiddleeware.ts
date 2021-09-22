import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/authMethods";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      res
        .status(401)
        .json({ data: "Authorization failed. Token not provided" });
      return;
    }

    const data: any = await verifyToken(token);
    req.userId = data.userId;
    next();
  } catch (error) {
    res.status(500).json({ data: error });
  }
};

export default authentication;
