import Joi from "joi";

export const userRegisterValidation = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least {#limit} characters long",
    "string.max": "Name must not exceed {#limit} characters",
    "any.required": "Name is required",
  }),

  role: Joi.string().valid("ADMIN", "USER", "MANAGER").required().messages({
    "any.only": "Role must be one of [ADMIN, USER, MANAGER]",
    "string.empty": "Role is required",
    "any.required": "Role is required",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(6)
    .max(100)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$"))
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least {#limit} characters long",
      "string.max": "Password must not exceed {#limit} characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      "any.required": "Password is required",
    }),
});

export const userLoginValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});
