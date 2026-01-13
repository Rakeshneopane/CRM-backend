const express = require("express");
const router = express.Router();

const { postAgents, getAgents, deleteAgent } = require("../controllers/agentController");


router.post("/agents", postAgents);
router.get("/agents", getAgents);
router.delete("/agents/:id", deleteAgent);

module.exports = router;