const express = require("express");
const { findAllPosts, createPost } = require("../../controllers/api/posts.js");
const { ensureAuth, ensureGuest } = require("../../middlewares/auth.js");

const router = express.Router();

router.get("/", ensureAuth, findAllPosts);
router.post("/", ensureAuth, createPost);

module.exports = router;
