const Joi = require('joi');

// ===

exports.adminValidation = ( data ) => {
    const adminSchema = new Joi.object({
        full_name: Joi.string()
            .trim()
            .min(2)
            .max(255)
            .required(),

        user_name: Joi.string()
            .trim()
            .max(255)
            .alphanum(),

        password: Joi.string()
            .min(6)
            .max(25)
            .required(),
        
        phone_number: Joi.string()
            .min(9)
            .max(30)
            .required(),

        email: Joi.string()
            .email()
            .required(),

        tg_link: Joi.string()
            .trim()
            .required(),

        description: Joi.string()
            .trim()
    });

    return adminSchema.validate( data, { abortEarly : false });
}

// ===