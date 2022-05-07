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

const randomString = (length = 10, encoding = "hex") => {
    return new Promise((resolve, reject) => {
        return crypto.randomBytes(length, (err, buffer) => {
            if (err) return reject(err);
            return resolve(buffer.toString(encoding));
        });
    });
};

module.exports = {
    getEnv,
    isDevelopment,
    randomString,
    upperCaseFirstLetterOfSentence,
    isDate,
};
