import Joi = require('@hapi/joi')

export const HelloSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(4)
    .max(30)
    .required(),
  id: Joi.string()
    .alphanum()
    .min(6)
    .max(7)
    .required()
})
