const joi = require('joi');

const newCommentSchema = joi.object({
    content: joi.string()
        .min(3)
        .max(255)
        .required()
});

module.exports = { newCommentSchema };