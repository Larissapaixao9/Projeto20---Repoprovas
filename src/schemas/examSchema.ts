import Joi from 'joi'

export const examSchema = Joi.object({
    name: Joi.string().required().trim(),
    pdfUrl: Joi.string().required().trim().uri(),
    categoryId:Joi.number().required(),
    disciplineId: Joi.number().required(),
    instructureId: Joi.number().required()
  });
