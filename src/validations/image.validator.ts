import Joi from "joi";
import { ImageType } from "../utils/enums";

export const uploadImageValidation = Joi.object({
  type: Joi.string()
    .valid(...Object.values(ImageType))
    .required()
    .messages({
      "any.only": `Type must be one of [${Object.values(ImageType).join(", ")}]`,
      "string.empty": "Type is required",
      "any.required": "Type is required",
    }),
});
