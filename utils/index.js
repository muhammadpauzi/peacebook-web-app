const { Request } = require("express");
const crypto = require("crypto");

const getEnv = (key = "", defaultValue = null) => {
    return process.env[key] || defaultValue;
};

const isDevelopment = () => {
    return getEnv("NODE_ENV", "development") === "development";
};

const upperCaseFirstLetterOfSentence = (string) => {
    return string[0].toUpperCase() + string.substr(1, string.length);
};

const isDate = (date) => {
    return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
};

/**
 * -
 * @param {Request} req
 * @returns {string}
 */
const getBaseURL = (req) => {
    return req.protocol + "://" + req.get("host");
};

const randomString = (length = 10, encoding = "hex") => {
    return new Promise((resolve, reject) => {
        return crypto.randomBytes(length, (err, buffer) => {
            if (err) return reject(err);
            return resolve(buffer.toString(encoding));
        });
    });
};

/**
 * -
 * @param {{length, limit, skip}} param0
 * @returns {boolean|number}
 */
const getNextPaginationNumber = ({ length, limit, skip }) => {
    return length > 0 && length >= limit ? { skip: limit + skip } : false;
};

/**
 * -
 * @param {{limit, skip}} param0
 * @returns {boolean|number}
 */
const getPreviousPaginationNumber = ({ limit, skip }) => {
    return skip <= 0 ? false : { skip: skip - limit };
};

/**
 *
 * @param {string} sort
 * @param {string[]} allowedSorts
 * @returns string
 */
const buildAndGetSort = (sort, allowedSorts) => {
    return allowedSorts.includes(sort) ? sort.toUpperCase() : allowedSorts[0];
};

module.exports = {
    getEnv,
    isDevelopment,
    randomString,
    upperCaseFirstLetterOfSentence,
    isDate,
    getBaseURL,
    getNextPaginationNumber,
    getPreviousPaginationNumber,
    buildAndGetSort,
};
