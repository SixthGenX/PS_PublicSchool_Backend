require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import connectDB from "./db/db";
import indexRouter from "./routes/index";
import { requestLoggerMiddleware } from "./middlewares/reqResLogger";
import ApplicationError, { ApiCodes } from "./models/apiModel/ApiCode";
import { createResponse } from "./utils/apiUtils/apiUtils";
import Joi from "joi";

connectDB();

// Create an Express application
const app = express();

// Middleware
app.use(express.json());
app.use(requestLoggerMiddleware({ log: console.log }));
app.use(express.urlencoded({ extended: true }));

// app.use(deviceInfoMiddleware);

// Routes
app.use("/", indexRouter);

//Sending 404 Error For Unknown Requests
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  return res
    .status(ApiCodes.NOT_FOUND.statusCode)
    .json(createResponse({}, ApiCodes.NOT_FOUND));
});

// scheduleCronJobs();

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) {
    return next();
  }
  if (err instanceof ApplicationError) {
    console.error(err);
    // handle the validation error and respond with appropriate error message and status code
    return res
      .status(err.apiCode.statusCode)
      .json(createResponse({}, err.apiCode));
  } else if (err instanceof Joi.ValidationError) {
    console.error("Validation error:", err.details);
    return res.status(ApiCodes.VALIDATION_ERROR.statusCode).json(
      createResponse(
        {},
        {
          ...ApiCodes.VALIDATION_ERROR,
          message: err.details[0].message,
        },
      ),
    );
  } else if (err instanceof SyntaxError) {
    return res
      .status(ApiCodes.INVALID_JSON_FORMAT.statusCode)
      .json(createResponse({}, ApiCodes.INVALID_JSON_FORMAT));
  } else {
    console.error(err);
    return res
      .status(500)
      .json(createResponse({}, ApiCodes.INTERNAL_SERVER_ERROR));
  }
};

export default errorHandler;

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
