import { Request, Response, NextFunction } from "express";
import { createStudentIfNotExistsDao } from "../dao/studentDao";
import { createResultDao, resultExistsDao } from "../dao/resultDao";
import { ClassEnum, ResultStatus } from "../utils/enums";
import { studentRequestValidation } from "../validations/result.validator";
import ApplicationError, { ApiCodes } from "../models/apiModel/ApiCode";
import { createResponse } from "../utils/apiUtils/apiUtils";

export const createResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Step 1: Validate request body
    await studentRequestValidation.validateAsync(req.body);

    const {
      rollNumber,
      name,
      class: className,
      status,
    } = req.body as {
      rollNumber: number;
      name: string;
      class: ClassEnum;
      status: ResultStatus;
    };

    // Step 2: Ensure student exists (create if not exists)
    await createStudentIfNotExistsDao(name, className, rollNumber);

    // Step 3: Check if result already exists for (class + rollNumber)
    const exists = await resultExistsDao(rollNumber, className);
    if (exists) {
      throw new ApplicationError(ApiCodes.RESULT_ALREADY_EXISTS);
    }

    // Step 4: Create the result
    const result = await createResultDao(rollNumber, className, status);

    if (!result) {
      throw new ApplicationError(ApiCodes.RESULT_CREATION_FAILED);
    }

    // Step 5: Prepare safe object
    const safeResult = {
      _id: result._id,
      class: result.class,
      studentId: result.studentId,
      status: result.status,
    };

    // Step 6: Send response
    res
      .status(ApiCodes.RESULT_CREATED_SUCCESS.statusCode)
      .send(createResponse(safeResult, ApiCodes.RESULT_CREATED_SUCCESS));
  } catch (err: any) {
    console.error("Got error while creating result", err);
    next(err);
  }
};
