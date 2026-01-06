const express = require("express");
const router = express.Router();

const { getReportClosedByAgent, getReportLastWeek, getReportPipeline } = require("../controllers/reportController");

router.get("/report/last-week", getReportLastWeek);
router.get("/report/pipeline", getReportPipeline);
router.get("/report/closed-by-agent", getReportClosedByAgent);

module.exports = router;