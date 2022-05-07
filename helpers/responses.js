const { Response } = require("express");

/**
 *
 * @param {Response} res
 * @param {object} data
 * @param {number} statusCode
 * @returns -
 */
const successResponse = (res, data, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        ...data,
    });
};

/**
 *
 * @param {Response} res
 * @param {*} error
 * @param {number} statusCode
 * @returns -
 */
const errorResponse = (res, error, statusCode = 500) => {
    if (isDevelopment) console.log(error);
    return res.status(statusCode).json({
        success: false,
        message: error.message || "",
        error: error,
    });
};

module.exports = { successResponse, errorResponse };
