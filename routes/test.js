/**
 * path: api/test
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { createTest, getAllTests, getTestsByTeacher, getTestbyCode, deleteTest, clearTest, updateTest } = require("../controllers/test")
const { getIndividualQuestionData, getAllQuestionData } = require("../controllers/questionScore")

const router = Router();

router.post("/new", [check("teacher", "Teacher needed").not().isEmpty(), check("name", "Named needed").not().isEmpty()], createTest);
router.get("/listAll", getAllTests)
router.get("/listByTeacher/:teacher", getTestsByTeacher)
router.get("/listByCode/:code", getTestbyCode)
router.delete("/delete/:id", deleteTest)
router.get("/clear/:id", clearTest)
router.get("/getQuestionScore/:id", getIndividualQuestionData)
router.get("/getTestScore/:id", getAllQuestionData)
router.put("/update/:id", updateTest)
module.exports = router