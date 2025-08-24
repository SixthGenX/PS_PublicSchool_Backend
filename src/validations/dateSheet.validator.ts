import Joi from "joi";
import { ClassRangeForResult } from "../utils/enums";

export const createDateSheetSchema = Joi.object({
  classRange: Joi.string()
    .valid(...Object.values(ClassRangeForResult))
    .required()
    .messages({
      "any.required": "Class range is required",
      "any.only": "Invalid class range value",
    }),
  imageId: Joi.string().required().messages({
    "any.required": "Image is required",
  }),
});

export const updateDateSheetSchema = Joi.object({
  classRange: Joi.string()
    .valid(...Object.values(ClassRangeForResult))
    .messages({
      "any.only": "Invalid class range value",
    }),
  imageId: Joi.string().optional().messages({
    "any.required": "Image is required",
  }),
}).min(1); // At least one field is required for update

export const getDateSheetSchema = Joi.object({
  classRange: Joi.string()
    .valid(...Object.values(ClassRangeForResult))
    .messages({
      "any.only": "Invalid class range value",
    }),
});
