const renderWithUserAndFlash = ({ req, res, title, path, data = {} }) => {
    data.title = title;
    data.user = {
        ...req.user,
        isAuthenticated: req.isAuthenticated(),
    };
    data.errorMessage = req.flash("error");
    data.successMessage = req.flash("success");
    return res.render(path, data);
};

module.exports = { renderWithUserAndFlash };
