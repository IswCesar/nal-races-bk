const { response } = require("express")
const Teacher = require("../models/teacher")

const createTeacher = async(req, res = response) => {
    try {
        const teacher = new Teacher(req.body)
        await teacher.save();
        res.json({
            ok: true,
            teacher
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact admin",
        });
    }
}

const getAllTeachers = async(req, res = response) => {
    const all = await Teacher.find();
    res.json({
        ok: true,
        teachers: all
    })
}

const teacherExist = async(req, res = response) => {
    const username = req.params.username;
    try {
        const teacher = await Teacher.find({ username });
        res.json({
            ok: true,
            teacher
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact admin",
        });
    }
}

module.exports = {
    createTeacher,
    getAllTeachers,
    teacherExist
}