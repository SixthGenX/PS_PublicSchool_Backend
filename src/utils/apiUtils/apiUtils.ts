import { ApiCode } from "../../models/apiModel/ApiCode";
import { ApiResponse } from "../../models/apiModel/ApiResponse";

export const createResponse = <T>(body: T, code: ApiCode): ApiResponse<T> => {
  return {
    body: body,
    status: {
      apiCode: code.apiCode,
      isError: code.isError,
      message: code.message,
      statusCode: code.statusCode,
    },
  };
};
