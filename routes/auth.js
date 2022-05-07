const express = require("express");
const passport = require("passport");
const {
    renderWithUserAndFlash,
} = require("../helpers/renderWithUserAndFlash.js");
const { ensureAuth, ensureGuest } = require("../middlewares/auth.js");

const router = express.Router();

router.get("/sign-in", ensureGuest, (req, res) => {
    return renderWithUserAndFlash({
        req,
        res,
        title: "Sign in | Peacebook",
        path: "auth/sign-in",
        data: {
            layout: "main-auth",
        },
    });
});

router.post("/sign-out", ensureAuth, (req, res) => {
    req.logout();
    req.flash("success", "You have successfully signed out!");
    return res.redirect("/sign-in");
});

router.post(
    "/google",
    ensureGuest,
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account",
    })
);

router.get(
    "/google/callback",
    ensureGuest,
    passport.authenticate("google", {
        failureRedirect: "/sign-in",
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        req.flash(
            "success",
            "Congratulations, you have successfully signed in!"
        );
        res.redirect("/");
    }
);

module.exports = router;
