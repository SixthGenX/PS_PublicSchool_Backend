import Joi from "joi";
import { BookStatus, ClassEnum } from "../utils/enums";

export const libraryBookValidation = Joi.object({
  bookTitle: Joi.string().min(2).max(100).required().messages({
    "string.base": "Book title must be a string",
    "string.empty": "Book title is required",
    "any.required": "Book title is required",
  }),

  bookNumber: Joi.number().integer().min(1).required().messages({
    "number.base": "Book number must be a number",
    "any.required": "Book number is required",
  }),

  class: Joi.string()
    .valid(...Object.values(ClassEnum))
    .required()
    .messages({
      "any.only": "Class must be between CLASS_1 and CLASS_12",
      "any.required": "Class is required",
    }),

  issuedTo: Joi.string().optional().allow(null, "").messages({
    "string.base": "IssuedTo must be a valid studentId string",
  }),

  rollNo: Joi.number().integer().optional().messages({
    "number.base": "Roll number must be a valid integer",
  }),

  bookStatus: Joi.string()
    .valid(...Object.values(BookStatus))
    .required()
    .messages({
      "any.only": `Book status must be one of: ${Object.values(BookStatus).join(
        ", "
      )}`,
      "any.required": "Book status is required",
    }),
});
