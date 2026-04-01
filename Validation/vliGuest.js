const Joi = require("joi")


const vliSchemaGustcreat = Joi.object({
    content: Joi.string().min(3).required(),
  
    expiresInMinutes: Joi.number().required()
})
const vliSchemaGustget = Joi.object({
    code: Joi.string().required().length(5),
})

module.exports = {vliSchemaGustcreat,vliSchemaGustget}