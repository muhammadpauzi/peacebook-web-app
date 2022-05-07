const { isDevelopment } = require("../utils/index.js");

const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated() || isDevelopment()) {
        next();
    } else {
        res.redirect("/sign-in");
    }
};

const ensureGuest = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect("/");
    } else {
        next();
    }
};

module.exports = {
    ensureAuth,
    ensureGuest,
};
