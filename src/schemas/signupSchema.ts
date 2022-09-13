import Joi from 'joi'

export const signupSchema = Joi.object({
    email: Joi.string().required().trim().email(),
    password: Joi.string().required().min(3),
    confirmPassword: Joi.string().required().min(3)
  });
  