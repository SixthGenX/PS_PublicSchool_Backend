import { Request, Response, NextFunction } from "express";
import { addOrUpdateLibraryBookDao } from "../dao/libraryDao";
import { libraryBookValidation } from "../validations/library.validator";
import { ApiCodes } from "../models/apiModel/ApiCode";
import { createResponse } from "../utils/apiUtils/apiUtils";
export const addOrUpdateLibraryBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    libraryBookValidation.validateAsync(req.body);

    const {
      bookTitle,
      bookNumber,
      class: className,
      rollNo,
      issuedTo,
      bookStatus,
    } = req.body;

    const result = await addOrUpdateLibraryBookDao(
      bookTitle,
      bookNumber,
      className,
      rollNo,
      issuedTo || null,
      bookStatus
    );

    res.status(ApiCodes.SUCCESS.statusCode).json(
      createResponse(result, {
        ...ApiCodes.SUCCESS,
        message: "Book added/updated successfully",
      })
    );
  } catch (err: any) {
    console.error("Error processing library request", err);
    next(err);
  }
};
