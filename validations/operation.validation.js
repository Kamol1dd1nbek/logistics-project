const Joi = require('joi');

exports.operationValidate = (data) => {
    const operationSchema = new Joi.object({
        order_id: Joi.number()
            .required(),
        status_id: Joi.number()
            .required(),
        admin_id: Joi.number()
            .required(),
        operation_date: Joi.date().default(new Date()),
        description: Joi.string()
            .required()
    });

    return operationSchema.validate( data, { abortEarly : false });
}