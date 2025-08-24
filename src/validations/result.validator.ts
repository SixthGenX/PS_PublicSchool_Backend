import Joi from "joi";
import { ClassEnum, ResultStatus } from "../utils/enums";

export const studentRequestValidation = Joi.object({
  rollNumber: Joi.number().integer().min(1).required().messages({
    "number.base": "Roll Number must be a valid number",
    "number.empty": "Roll Number is required",
    "any.required": "Roll Number is required",
  }),

  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least {#limit} characters long",
    "string.max": "Name must not exceed {#limit} characters",
    "any.required": "Name is required",
  }),

  marks: Joi.number().min(0).max(100).required().messages({
    "number.base": "Marks must be a valid number",
    "number.min": "Marks cannot be less than {#limit}",
    "number.max": "Marks cannot exceed {#limit}",
    "any.required": "Marks are required",
  }),

  class: Joi.string()
    .valid(...Object.values(ClassEnum))
    .required()
    .messages({
      "any.only": `Class must be one of ${Object.values(ClassEnum).join(", ")}`,
      "string.empty": "Class is required",
      "any.required": "Class is required",
    }),

  status: Joi.string()
    .valid(...Object.values(ResultStatus))
    .required()
    .messages({
      "any.only": `Status must be one of ${Object.values(ResultStatus).join(", ")}`,
      "string.empty": "Status is required",
      "any.required": "Status is required",
    }),
});
