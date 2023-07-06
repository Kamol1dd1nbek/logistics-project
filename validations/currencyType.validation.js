const Joi = require('joi');

exports.currencyTypeValidation = (data) => {
    const currencyTypeSchema = new Joi.object({
        name: Joi.string()
            .trim()
            .required(),
        description: Joi.string()
            .trim()
            .required(),
    });

    return currencyTypeSchema.validate( data, { abortEarly : false });
}