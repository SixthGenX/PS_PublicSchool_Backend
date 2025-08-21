import express, { Request, Response } from "express";
import { ApiCodes } from "../models/apiModel/ApiCode";
import userRouter from "../routes/userRoutes";

const router = express.Router();

const BASE_URL_VERSION_V1: string = "/api/v1";

router.use(`${BASE_URL_VERSION_V1}/user`, userRouter);

router.get("/", async (req: Request, res: Response) => {
  res.status(ApiCodes.SUCCESS.statusCode).json(ApiCodes.SUCCESS);
});

export default router;
