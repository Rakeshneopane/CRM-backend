const express = require("express");
const router = express.Router();

const { postLead, getLeads, getLeadById, updateLead, deleteLead, postComments, getComments} = require("../controllers/leadController");

router.post("/lead", postLead);
router.get("/leads", getLeads);
router.get("/lead/:id", getLeadById);
router.put("/lead/:id", updateLead);
router.delete("/lead/:id", deleteLead);
router.post("/lead/:id/comments", postComments);
router.get("/lead/:id/comments", getComments);

module.exports = router;