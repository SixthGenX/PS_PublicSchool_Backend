export interface ApiCode {
  isError: boolean;
  message: string;
  apiCode: string;
  statusCode: number;
}

interface ApiCodes {
  NOT_FOUND: ApiCode;
  IMAGE_NOT_FOUND: ApiCode;
  SUCCESS: ApiCode;
  DUPLICATE_KEY_ERROR: ApiCode;
  INVALID_CAST_ERROR: ApiCode;
  MONGO_NETWORK_ERROR: ApiCode;
  MONGO_SERVER_ERROR: ApiCode;
  MONGOOSE_TIMEOUT_ERROR: ApiCode;
  MONGODB_VALIDATION_ERROR: ApiCode;
  AUTH_TOKEN_MISSING: ApiCode;
  LOCALHOST_ONLY: ApiCode;
  TOKEN_EXPIRED_ERROR: ApiCode;
  INVALID_TOKEN: ApiCode;
  NOT_A_NUMBER: ApiCode;
  BAD_REQUEST: ApiCode;
  REFRESH_TOKEN_EXPIRED_ERROR: ApiCode;
  EMAIL_ALREADY_EXIST: ApiCode;
  MISSING_REQUIRED_FIELDS: ApiCode;
  AUTH_ERROR: ApiCode;
  INVALID_OTP: ApiCode;
  OTP_NOT_VERIFIED: ApiCode;
  OTP_EXPIRY: ApiCode;
  EMPTY_REQUEST_PASSED: ApiCode;
  VALIDATION_ERROR: ApiCode;
  INVALID_JSON_FORMAT: ApiCode;
  INTERNAL_SERVER_ERROR: ApiCode;
  VERIFICATION_ID_NOT_FOUND: ApiCode;
  USER_NOT_FOUND: ApiCode;
  USER_NOT_UPDATED: ApiCode;
  USER_ROLE_NOT_ALLOWED: ApiCode;
  TOPIC_NOT_FOUND: ApiCode;
  USER_RATINGS_NOT_FOUND: ApiCode;
  COUNSELLOR_NOT_FOUND: ApiCode;
  CUSTOMER_CANNOT_BE_RATED: ApiCode;
  COUNSELLOR_CANNOT_RATE: ApiCode;
  USER_CANNOT_UPDATE_TOPIC: ApiCode;
  USER_CANNOT_UPDATE_DISCUSSION: ApiCode;
  DISCUSSION_NOT_FOUND: ApiCode;
  REPLY_NOT_FOUND: ApiCode;
  USER_CANNOT_UPDATE_REPLY: ApiCode;
  SENT_TO_USER_NOT_FOUND: ApiCode;
  INVALID_NOTIFICATION_TYPE: ApiCode;
  INVALID_NOTIFICATION_PAYLOAD: ApiCode;
  USER_CANNOT_SEND_MESSAGE_ITSELF: ApiCode;
  USER_TOPIC_ALREADY_SELECTED: ApiCode;
  USER_TOPIC_NOT_SELECTED: ApiCode;
  COUNSELLOR_ALREADY_ADDED_TO_FAVORITE: ApiCode;
  COUNSELLOR_NOT_ADDED_TO_FAVORITE: ApiCode;
  COUNSELLOR_CANNOT_BE_ADDED_TO_FAVORITE: ApiCode;
  EMAIL_ALREADY_REGISTERED: ApiCode;
  INVALID_CREDENTIALS: ApiCode;
  LOGIN_SUCCESS: ApiCode;
  REGISTER_SUCCESS: ApiCode;
  DATE_SHEET_CREATED: ApiCode;
  DATE_SHEET_UPDATED: ApiCode;
  DATE_SHEET_NOT_FOUND: ApiCode;
  INVALID_IMAGE: ApiCode;
  IMAGE_REQUIRED: ApiCode;
  RESULT_ALREADY_EXISTS: ApiCode;
  RESULT_CREATED_SUCCESS: ApiCode;
  RESULT_CREATION_FAILED: ApiCode;
  UNAUTHORIZED: ApiCode;
  FORBIDDEN: ApiCode;
}

export default class ApplicationError extends Error {
  constructor(
    public readonly apiCode: ApiCode,
    message?: string
  ) {
    super(message || apiCode.message);
    this.name = "ValidationError";
  }
}

export const ApiCodes: ApiCodes = {
  NOT_FOUND: {
    isError: true,
    message: "Something not right, Please try again after sometime!!",
    apiCode: "NOT_FOUND",
    statusCode: 404,
  },
  IMAGE_NOT_FOUND: {
    isError: true,
    message: "Image not found",
    apiCode: "IMAGE_404",
    statusCode: 404,
  },
  SUCCESS: {
    isError: false,
    message: "Operation success",
    apiCode: "SUCCESS",
    statusCode: 200,
  },
  DUPLICATE_KEY_ERROR: {
    isError: true,
    message: "Duplicate key error",
    apiCode: "DUPLICATE_KEY_ERROR",
    statusCode: 400,
  },
  INVALID_CAST_ERROR: {
    isError: true,
    message: "Invalid cast error",
    apiCode: "INVALID_CAST_ERROR",
    statusCode: 400,
  },
  MONGO_NETWORK_ERROR: {
    isError: true,
    message: "MongoDB network error",
    apiCode: "MONGO_NETWORK_ERROR",
    statusCode: 500,
  },
  MONGO_SERVER_ERROR: {
    isError: true,
    message: "MongoDB server error",
    apiCode: "MONGO_SERVER_ERROR",
    statusCode: 500,
  },
  MONGOOSE_TIMEOUT_ERROR: {
    isError: true,
    message: "MongoDB server error",
    apiCode: "MONGOOSE_TIMEOUT_ERROR",
    statusCode: 500,
  },
  MONGODB_VALIDATION_ERROR: {
    isError: true,
    message: "Invalid fields provided",
    apiCode: "MONGODB_VALIDATION_ERROR",
    statusCode: 400,
  },
  AUTH_TOKEN_MISSING: {
    isError: true,
    message: "Auth Token Missing.",
    apiCode: "AUTH_TOKEN_MISSING",
    statusCode: 401,
  },
  LOCALHOST_ONLY: {
    isError: true,
    message: "This route can only be accessed from localhost",
    apiCode: "LOCALHOST_ONLY",
    statusCode: 403,
  },
  TOKEN_EXPIRED_ERROR: {
    isError: true,
    message: "Token expired",
    apiCode: "TOKEN_EXPIRED_ERROR",
    statusCode: 400,
  },
  INVALID_TOKEN: {
    isError: true,
    message: "Invalid token",
    apiCode: "INVALID_TOKEN",
    statusCode: 400,
  },
  NOT_A_NUMBER: {
    isError: true,
    message: "Input entered is not a number. It must be a number",
    apiCode: "NOT_A_NUMBER",
    statusCode: 400,
  },
  BAD_REQUEST: {
    isError: true,
    message: "Bad request data",
    apiCode: "BAD_REQUEST",
    statusCode: 400,
  },
  REFRESH_TOKEN_EXPIRED_ERROR: {
    isError: true,
    message: "Please login again, your session has expired",
    apiCode: "REFRESH_TOKEN_EXPIRED_ERROR",
    statusCode: 400,
  },
  EMAIL_ALREADY_EXIST: {
    isError: true,
    message: "Email already exists. Please enter a new email.",
    apiCode: "EMAIL_ALREADY_EXIST",
    statusCode: 400,
  },
  MISSING_REQUIRED_FIELDS: {
    isError: true,
    message: "Missing required fields",
    apiCode: "MISSING_REQUIRED_FIELDS",
    statusCode: 400,
  },
  AUTH_ERROR: {
    isError: true,
    message: "User is not authorized to access this resource.",
    apiCode: "AUTH_ERROR",
    statusCode: 401,
  },
  INVALID_OTP: {
    isError: true,
    message: "Invalid OTP code",
    apiCode: "INVALID_OTP",
    statusCode: 401,
  },
  OTP_NOT_VERIFIED: {
    isError: true,
    message: "OTP not verified.",
    apiCode: "OTP_NOT_VERIFIED",
    statusCode: 401,
  },
  OTP_EXPIRY: {
    isError: true,
    message: "OTP has expired. Please request a new one.",
    apiCode: "OTP_EXPIRY",
    statusCode: 400,
  },
  EMPTY_REQUEST_PASSED: {
    isError: true,
    message: "Empty request passed",
    apiCode: "EMPTY_REQUEST_PASSED",
    statusCode: 400,
  },
  VALIDATION_ERROR: {
    isError: true,
    message: "Invalid fields provided",
    apiCode: "VALIDATION_ERROR",
    statusCode: 400,
  },
  INVALID_JSON_FORMAT: {
    isError: true,
    message: "Invalid request passed",
    apiCode: "INVALID_JSON_FORMAT",
    statusCode: 400,
  },
  INTERNAL_SERVER_ERROR: {
    isError: true,
    message: "Internal server error",
    apiCode: "INTERNAL_SERVER_ERROR",
    statusCode: 500,
  },
  VERIFICATION_ID_NOT_FOUND: {
    isError: true,
    message: "Verification Id was not found",
    apiCode: "VERIFICATION_ID_NOT_FOUND",
    statusCode: 404,
  },
  USER_NOT_FOUND: {
    isError: true,
    message: "User not found",
    apiCode: "USER_404",
    statusCode: 404,
  },
  USER_NOT_UPDATED: {
    isError: true,
    message: "User could not be updated. Please try later",
    apiCode: "USER_404",
    statusCode: 400,
  },
  USER_ROLE_NOT_ALLOWED: {
    isError: true,
    message: "User role not allowed.",
    apiCode: "USER_ROLE_NOT_ALLOWED",
    statusCode: 400,
  },
  TOPIC_NOT_FOUND: {
    isError: true,
    message: "Topic not found.",
    apiCode: "TOPIC_NOT_FOUND",
    statusCode: 404,
  },
  USER_RATINGS_NOT_FOUND: {
    isError: true,
    message: "User Ratings not found.",
    apiCode: "USER_RATINGS_NOT_FOUND",
    statusCode: 404,
  },
  COUNSELLOR_NOT_FOUND: {
    isError: true,
    message: "Counsellor not found.",
    apiCode: "COUNSELLOR_NOT_FOUND",
    statusCode: 404,
  },
  CUSTOMER_CANNOT_BE_RATED: {
    isError: true,
    message: "Customer cannot be rated.",
    apiCode: "CUSTOMER_CANNOT_BE_RATED",
    statusCode: 404,
  },
  COUNSELLOR_CANNOT_RATE: {
    isError: true,
    message: "Counsellor cannot rate.",
    apiCode: "COUNSELLOR_CANNOT_RATE",
    statusCode: 404,
  },
  USER_CANNOT_UPDATE_TOPIC: {
    isError: true,
    message: "User cannot update this topic.",
    apiCode: "USER_CANNOT_UPDATE_TOPIC",
    statusCode: 404,
  },
  DISCUSSION_NOT_FOUND: {
    isError: true,
    message: "Discussion not found.",
    apiCode: "DISCUSSION_NOT_FOUND",
    statusCode: 404,
  },
  USER_CANNOT_UPDATE_DISCUSSION: {
    isError: true,
    message: "User cannot update discussion.",
    apiCode: "USER_CANNOT_UPDATE_DISCUSSION",
    statusCode: 400,
  },
  REPLY_NOT_FOUND: {
    isError: true,
    message: "Reply not found.",
    apiCode: "REPLY_NOT_FOUND",
    statusCode: 404,
  },
  USER_CANNOT_UPDATE_REPLY: {
    isError: true,
    message: "User cannot update reply.",
    apiCode: "USER_CANNOT_UPDATE_REPLY",
    statusCode: 400,
  },
  SENT_TO_USER_NOT_FOUND: {
    isError: true,
    message: "User you are trying to send message is not found.",
    apiCode: "SENT_TO_USER_NOT_FOUND",
    statusCode: 404,
  },
  INVALID_NOTIFICATION_TYPE: {
    isError: true,
    message: "Invalid Notification Type Provided.",
    apiCode: "INVALID_NOTIFICATION_TYPE",
    statusCode: 400,
  },
  INVALID_NOTIFICATION_PAYLOAD: {
    isError: true,
    message: "Invalid Notification Payload Provided.",
    apiCode: "INVALID_NOTIFICATION_PAYLOAD",
    statusCode: 400,
  },
  USER_CANNOT_SEND_MESSAGE_ITSELF: {
    isError: true,
    message: "User cannot send messages to itself.",
    apiCode: "USER_CANNOT_SEND_MESSAGE_ITSELF",
    statusCode: 400,
  },
  USER_TOPIC_ALREADY_SELECTED: {
    isError: true,
    message: "User has already selected this topic.",
    apiCode: "USER_TOPIC_ALREADY_SELECTED",
    statusCode: 400,
  },
  USER_TOPIC_NOT_SELECTED: {
    isError: true,
    message: "User has not selected this topic.",
    apiCode: "USER_TOPIC_NOT_SELECTED",
    statusCode: 400,
  },
  COUNSELLOR_ALREADY_ADDED_TO_FAVORITE: {
    isError: true,
    message: "Counsellor has already been added to favorites.",
    apiCode: "COUNSELLOR_ALREADY_ADDED_TO_FAVORITE",
    statusCode: 400,
  },
  COUNSELLOR_NOT_ADDED_TO_FAVORITE: {
    isError: true,
    message: "Counsellor has not been added to favorites.",
    apiCode: "COUNSELLOR_NOT_ADDED_TO_FAVORITE",
    statusCode: 400,
  },
  COUNSELLOR_CANNOT_BE_ADDED_TO_FAVORITE: {
    isError: true,
    message: "Counsellor cannot be added to favorites.",
    apiCode: "COUNSELLOR_CANNOT_BE_ADDED_TO_FAVORITE",
    statusCode: 400,
  },
  EMAIL_ALREADY_REGISTERED: {
    isError: true,
    message: "Email already registered",
    apiCode: "EMAIL_ALREADY_REGISTERED",
    statusCode: 400,
  },
  INVALID_CREDENTIALS: {
    isError: true,
    message: "Invalid credentials",
    apiCode: "INVALID_CREDENTIALS",
    statusCode: 400,
  },
  LOGIN_SUCCESS: {
    isError: false,
    message: "Login successful",
    apiCode: "LOGIN_SUCCESS",
    statusCode: 200,
  },
  REGISTER_SUCCESS: {
    isError: false,
    message: "User registered successfully",
    apiCode: "REGISTER_SUCCESS",
    statusCode: 201,
  },
  DATE_SHEET_CREATED: {
    isError: false,
    message: "Date sheet created successfully",
    apiCode: "DATE_SHEET_CREATED",
    statusCode: 201,
  },
  DATE_SHEET_UPDATED: {
    isError: false,
    message: "Date sheet updated successfully",
    apiCode: "DATE_SHEET_UPDATED",
    statusCode: 200,
  },
  DATE_SHEET_NOT_FOUND: {
    isError: true,
    message: "Date sheet not found",
    apiCode: "DATE_SHEET_NOT_FOUND",
    statusCode: 404,
  },
  INVALID_IMAGE: {
    isError: true,
    message: "Invalid image file. Only image files are allowed",
    apiCode: "INVALID_IMAGE",
    statusCode: 400,
  },
  IMAGE_REQUIRED: {
    isError: true,
    message: "Image is required",
    apiCode: "IMAGE_REQUIRED",
    statusCode: 400,
  },
  RESULT_ALREADY_EXISTS: {
    statusCode: 400,
    isError: true,
    message: "Result already exists for this class and roll number",
    apiCode: "RESULT_ALREADY_EXISTS",
  },
  RESULT_CREATED_SUCCESS: {
    statusCode: 201,
    isError: false,
    message: "Result created successfully",
    apiCode: "RESULT_CREATED_SUCCESS",
  },
  RESULT_CREATION_FAILED: {
    statusCode: 500,
    isError: true,
    message: "Failed to create result",
    apiCode: "RESULT_CREATION_FAILED",
  },
  UNAUTHORIZED: {
    isError: true,
    message: "You are not authorized. Please login first.",
    apiCode: "UNAUTHORIZED",
    statusCode: 401,
  },
  FORBIDDEN: {
    isError: true,
    message: "You do not have permission to perform this action.",
    apiCode: "FORBIDDEN",
    statusCode: 403,
  },
};
