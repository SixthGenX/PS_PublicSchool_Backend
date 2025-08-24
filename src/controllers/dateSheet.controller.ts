import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { MulterRequest } from "../types/express";
import {
  createDateSheetSchema,
  updateDateSheetSchema,
  getDateSheetSchema,
} from "../validations/dateSheet.validator";
import { ClassRangeForResult, ImageType } from "../utils/enums";
import { createResponse } from "../utils/apiUtils/apiUtils";
import ApplicationError, { ApiCodes } from "../models/apiModel/ApiCode";
import { createImageDao, imageExistsDao } from "../dao/imageDao";
import {
  createDateSheetDao,
  doesDateSheetExistByIdDao,
  findDateSheetByIdDao,
  findDateSheetsDao,
  updateDateSheetDao,
} from "../dao/dateSheetDao";
import { IImage } from "../models/Image";
import { IDateSheet } from "../models/DateSheet";

// Extend the Request type to include query and params
interface RequestWithQuery extends Request {
  query: {
    classRange?: string;
  };
}

interface RequestWithParams extends Request {
  params: {
    id?: string;
  };
}

export const createDateSheet = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await createDateSheetSchema.validateAsync(req.body);

    const { classRange } = req.body;

    const imageExists: boolean = await imageExistsDao(req.body?.imageId);

    if (!imageExists) {
      throw new ApplicationError(ApiCodes.IMAGE_NOT_FOUND);
    }

    // Create date sheet using DAO
    const dateSheet = await createDateSheetDao(
      classRange as ClassRangeForResult,
      new Types.ObjectId(req.body?.imageId)
    );

    res
      .status(ApiCodes.DATE_SHEET_CREATED.statusCode)
      .json(createResponse(dateSheet, ApiCodes.DATE_SHEET_CREATED));
  } catch (error) {
    next(error);
  }
};

export const updateDateSheet = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateDateSheetSchema.validateAsync(req.body);

    const { id } = req.params;
    const { classRange } = req.body;
    const updates: { classRange?: ClassRangeForResult; imageId?: string } = {};

    if (req.body?.imageId) {
      const imageExists: boolean = await imageExistsDao(req.body?.imageId);

      if (!imageExists) {
        throw new ApplicationError(ApiCodes.IMAGE_NOT_FOUND);
      }

      updates.imageId = req.body?.imageId;
    }

    // Find existing date sheet using DAO
    const existingDateSheet = await findDateSheetByIdDao(id);
    if (!existingDateSheet) {
      throw new ApplicationError(ApiCodes.DATE_SHEET_NOT_FOUND);
    }

    // Update class range if provided
    if (classRange) {
      updates.classRange = classRange as ClassRangeForResult;
    }

    const isDateSheetExists = await doesDateSheetExistByIdDao(id);

    if (!isDateSheetExists)
      throw new ApplicationError(ApiCodes.DATE_SHEET_NOT_FOUND);

    // Update date sheet using DAO
    const updatedDateSheet: IDateSheet = (await updateDateSheetDao(
      id,
      updates
    )) as IDateSheet;

    if (!updatedDateSheet) {
      throw new ApplicationError(ApiCodes.DATE_SHEET_NOT_FOUND);
    }

    // Get the updated date sheet with populated image
    const result = await findDateSheetByIdDao(updatedDateSheet._id.toString());

    res
      .status(ApiCodes.DATE_SHEET_UPDATED.statusCode)
      .json(createResponse(result, ApiCodes.DATE_SHEET_UPDATED));
  } catch (error) {
    next(error);
  }
};

export const getDateSheets = async (
  req: RequestWithQuery,
  res: Response,
  next: NextFunction
) => {
  try {
    const { classRange } = req.query;

    // Build filter object
    const filter: { classRange?: ClassRangeForResult } = {};
    if (classRange) {
      filter.classRange = classRange as ClassRangeForResult;
    }

    // Get date sheets using DAO
    const dateSheets = await findDateSheetsDao(filter);

    res.status(ApiCodes.SUCCESS.statusCode).json(
      createResponse(
        {
          dateSheets,
          count: dateSheets.length,
        },
        ApiCodes.SUCCESS
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getDateSheetById = async (
  req: RequestWithParams,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;

    // Get date sheet by ID using DAO
    const dateSheet = await findDateSheetByIdDao(id);
    if (!dateSheet) {
      throw new ApplicationError(ApiCodes.DATE_SHEET_NOT_FOUND);
    }

    res
      .status(ApiCodes.SUCCESS.statusCode)
      .json(createResponse(dateSheet, ApiCodes.SUCCESS));
  } catch (error) {
    next(error);
  }
};
