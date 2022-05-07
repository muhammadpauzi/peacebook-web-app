const { HOME_TITLE } = require("../constants/titles.js");
const {
    renderWithUserAndFlash,
} = require("../helpers/renderWithUserAndFlash.js");

const home = (req, res) => {
    return renderWithUserAndFlash({
        req,
        res,
        title: HOME_TITLE,
        path: "home/index",
    });
};

module.exports = {
    home,
};
