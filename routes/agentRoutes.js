const express = require("express");
const router = express.Router();

const { postAgents, getAgents } = require("../controllers/agentController");


router.post("/agents", postAgents);
router.get("/agents", getAgents);

module.exports = router;