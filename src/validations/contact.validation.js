const joi = require('joi');

const newContactSchema = joi.object({
    name: joi.string()
        .min(3)
        .max(64)
        .required(),

    email: joi.string()
        .max(64)
        .email()
        .required(),

    phoneNumber: joi.string()
        .regex(/[0-9]+/)
        .rule({ message: '{#label} must be numbers' })
        .required()
});

module.exports = { newContactSchema };