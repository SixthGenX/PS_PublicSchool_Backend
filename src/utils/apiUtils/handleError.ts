import { MongoServerSelectionError } from "mongodb";
import ApplicationError, { ApiCodes } from "../../models/apiModel/ApiCode";

export const handleMongoError = (error: any) => {
  try {
    if (error.message && error.message.includes("E11000 duplicate key error")) {
      throw new ApplicationError(ApiCodes.DUPLICATE_KEY_ERROR);
    } else if (
      error.message &&
      error.message.includes("Cast to ObjectId failed")
    ) {
      throw new ApplicationError(ApiCodes.INVALID_CAST_ERROR);
    } else if ((error as any).name === "ValidationError") {
      throw new ApplicationError(ApiCodes.MONGODB_VALIDATION_ERROR);
    } else if ((error as any).name === "MongoNetworkError") {
      throw new ApplicationError(ApiCodes.MONGO_NETWORK_ERROR);
    } else if ((error as any).name === "MongoServerError") {
      throw new ApplicationError(ApiCodes.MONGO_SERVER_ERROR);
    } else if (
      (error as any).name === "MongooseError" &&
      error.message.includes("buffering timed out")
    ) {
      throw new ApplicationError(ApiCodes.MONGOOSE_TIMEOUT_ERROR);
    } else if (error instanceof MongoServerSelectionError) {
      throw new ApplicationError(ApiCodes.MONGO_SERVER_ERROR);
    }
  } catch (error) {
    console.error("Mongodb error occured", error);
    throw error;
  }
};
