const joi = require('joi');

const newNewsSchema = joi.object({
    title: joi.string()
        .min(3)
        .max(255)
        .required(),

    content: joi.string()
        .min(3)
        .max(255)
        .required()
});

const updateNewsSchema = joi.object({
    title: joi.string()
        .min(3)
        .max(255),

    content: joi.string()
        .min(3)
        .max(255)
});

module.exports = { newNewsSchema, updateNewsSchema };