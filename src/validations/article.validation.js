const joi = require('joi');

const newArticleSchema = joi.object({
    title: joi.string()
        .min(3)
        .max(255)
        .required(),

    content: joi.string()
        .min(3)
        .max(255)
        .required()
});

const updateArticleSchema = joi.object({
    title: joi.string()
        .min(3)
        .max(255),

    content: joi.string()
        .min(3)
        .max(255)
});

module.exports = { newArticleSchema, updateArticleSchema };