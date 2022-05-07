const { ValidationError } = require("joi");
/**
 *
 * @param {ValidationError} error
 * @returns {object}
 */
const buildValidationMessages = (error) => {
    const messages = {};
    error.details.forEach((detail) => {
        messages[detail.context.key] = detail.message;
    });
    return messages;
};

module.exports = { buildValidationMessages };
