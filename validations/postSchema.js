const Joi = require("joi");

const postSchema = Joi.object({
    content: Joi.string().required(),
});

module.exports = postSchema;
