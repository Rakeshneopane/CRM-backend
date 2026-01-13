const express = require("express");
const router = express.Router();

const { postTags, getTags, deleteTag } = require("../controllers/tagController");

router.post("/tags", postTags);
router.get("/tags", getTags);
router.delete("/tags/:id", deleteTag);

module.exports = router;