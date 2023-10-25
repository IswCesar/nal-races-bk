/**
 * path: api/reports
 */

const { Router } = require("express")
const { check } = require("express-validator")
const { getResultsForTest } = require("../controllers/reports")


const router = Router();

router.get("/testScore/:test", getResultsForTest)

module.exports = router