/**
 * path: api/question
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { createQuestion, getAllQuestions, getQuestionByTest, get, deleteQuestion, updateQuestion } = require("../controllers/question")

const router = Router();

router.post("/new", [
    check("test", "Test needed").not().isEmpty(),
    check("question", "Question needed").not().isEmpty(),
    check("optionA", "Option A needed").not().isEmpty(),
    check("optionB", "Option B needed").not().isEmpty(),
    check("optionC", "Option C needed").not().isEmpty(),
    check("optionD", "Option D needed").not().isEmpty(),
    check("correctAnswer", "Correct answer needed").not().isEmpty()
], createQuestion);

router.get("/listAll", getAllQuestions)

router.get("/listByTest/:test", getQuestionByTest)

router.delete("/delete/:id", deleteQuestion)

router.put("/update/:id", updateQuestion)

module.exports = router