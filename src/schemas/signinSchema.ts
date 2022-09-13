import Joi from 'joi'

export const signinSchema = Joi.object({
    email: Joi.string().required().trim().email(),
    password: Joi.string().required().min(3)
  });
  