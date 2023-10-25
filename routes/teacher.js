/**
 * path: api/teacher
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { createTeacher, getAllTeachers, teacherExist } = require("../controllers/teacher")

const router = Router();

router.post("/new", [check("username", "Username needed").not().isEmpty()], createTeacher)
router.get("/listAll", getAllTeachers)
router.get("/exist/:username", teacherExist)


module.exports = router