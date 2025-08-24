import express, { Request, Response, NextFunction } from "express";
import ApplicationError, { ApiCodes } from "../models/apiModel/ApiCode";
import { createImageDao, findImageByIdDao } from "../dao/imageDao";
import { ImageType } from "../utils/enums";
import { createResponse } from "../utils/apiUtils/apiUtils";
import { uploadImageValidation } from "../validations/image.validator";

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await uploadImageValidation.validateAsync(req.body);

    if (!req.file) {
      throw new ApplicationError(ApiCodes.IMAGE_REQUIRED);
    }

    const { buffer, mimetype, size, originalname } = req.file;
    const { type } = req.body;

    const newImage = await createImageDao(
      buffer,
      type,
      mimetype,
      size,
      originalname
    );

    res
      .status(ApiCodes.SUCCESS.statusCode)
      .send(createResponse({ imageId: newImage._id }, ApiCodes.SUCCESS));
  } catch (error) {
    console.error("Got the error while uploading file", error);
    next(error);
  }
};

export const getImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const imageDoc = await findImageByIdDao(id);

    if (!imageDoc) {
      throw new ApplicationError({
        ...ApiCodes.NOT_FOUND,
        message: "Image Not Found.",
      });
    }

    res.set("Content-Type", imageDoc.mimeType);
    res.send(imageDoc.image);
  } catch (error) {
    next(error);
  }
};
