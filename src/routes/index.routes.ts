import express, { Request, Response } from "express";
import { ApiCodes } from "../models/apiModel/ApiCode";
import userRouter from "./user.routes";
import dateSheetRouter from "./dateSheet.routes";
import imageRouter from "./image.routes";
import resultRouter from "./result.routes";
import libraryRouter from "./library.routes";

const router = express.Router();

const BASE_URL_VERSION_V1: string = "/api/v1";

router.use(`${BASE_URL_VERSION_V1}/user`, userRouter);
router.use(`${BASE_URL_VERSION_V1}/date-sheets`, dateSheetRouter);
router.use(`${BASE_URL_VERSION_V1}/image`, imageRouter);
router.use(`${BASE_URL_VERSION_V1}/result`, resultRouter);
router.use(`${BASE_URL_VERSION_V1}/library`, libraryRouter);

router.get("/", async (req: Request, res: Response) => {
  res.status(ApiCodes.SUCCESS.statusCode).json(ApiCodes.SUCCESS);
});

export default router;
