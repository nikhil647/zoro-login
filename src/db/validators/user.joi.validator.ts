import Joi from "joi";

export const createUserSignInValidationSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(), // Todo Email Validator
  password: Joi.string().min(8).required()
});