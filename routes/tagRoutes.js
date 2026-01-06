const express = require("express");
const router = express.Router();

const { postTags, getTags } = require("../controllers/tagController");

router.post("/tags", postTags);
router.get("/tags", getTags);

module.exports = router;