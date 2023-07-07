const Joi = require('joi');

exports.orderValidation = ( data ) => {
    const orderSchema = new Joi.object({
        full_name: Joi.string()
            .trim()
            .required(),

        phone_number: Joi.string()
            .max(30)
            .min(7)
            .required(),

        product_link: Joi.string()
            .min(6)
            .max(400)
            .required(),

        summa: Joi.number()
            .min(0)
            .required(),

        currency_type_id: Joi.number()
            .min(0)
            .required(),

        truck: Joi.string()
                .min(3)
                .max(100)
                .required(),

        email: Joi.string()
            .email()
            .required(),

        description: Joi.string()
            .trim()
            .default("")
    });

    return orderSchema.validate( data, { abortEarly: false });
}