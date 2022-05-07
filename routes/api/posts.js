const express = require("express");
const { findAllPosts } = require("../../controllers/api/posts.js");
const { ensureAuth, ensureGuest } = require("../../middlewares/auth.js");

const router = express.Router();

router.get("/", ensureAuth, findAllPosts);

module.exports = router;
