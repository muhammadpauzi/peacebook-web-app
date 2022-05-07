const renderWithUserAndFlash = ({ req, res, title, path, data = {} }) => {
    const user = req?.user?._doc;
    data.title = title;
    data.user = {
        ...user,
        isAuthenticated: req.isAuthenticated(),
    };
    data.errorMessage = req.flash("error");
    data.successMessage = req.flash("success");
    return res.render(path, data);
};

module.exports = { renderWithUserAndFlash };
