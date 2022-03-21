const joi = require('joi');

const userRole = {
    MEMBER: 0,
    ADMIN: 1
};

const newUserSchema = joi.object({
    email: joi.string()
        .max(64)
        .email()
        .required(),

    password: joi.string()
        .min(6)
        .max(32)
        .regex(/[0-9]/)
        .rule({ message: '{#label} requires at least a number' })

        .regex(/[a-z]/)
        .rule({ message: '{#label} requires at least a lowercase character' })

        .regex(/[A-Z]/)
        .rule({ message: '{#label} requires at least an uppercase character' }),

    role: joi.number()
        .required()
});

module.exports = { newUserSchema, userRole };