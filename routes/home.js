const express = require("express");
const { home } = require("../controllers/home.js");
const { ensureAuth, ensureGuest } = require("../middlewares/auth.js");

const router = express.Router();

router.get("/", ensureAuth, home);

module.exports = router;
