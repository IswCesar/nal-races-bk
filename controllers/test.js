const { response } = require("express");
const Test = require("../models/test")
const Question = require("../models/question")
const QuestionResponse = require("../models/questionResponse")
const QuestionScore = require("../models/questionScore")
const Room = require("../models/room")
const mongoose = require('mongoose');


const createTest = async(req, res = response) => {
    try {
        const test = new Test(req.body);
        test.code = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);
        await test.save();
        res.json({
            ok: true,
            test: test
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact admin",
        });
    }
}

const getAllTests = async(req, res = response) => {
    const all = await Test.find();
    res.json({
        ok: true,
        tests: all
    })
}

const getTestsByTeacher = async(req, res = response) => {
    const teacher = req.params.teacher;
    try {
        const tests = await Test.find({
            teacher
        })

        res.json({
            ok: true,
            tests
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact admin",
        });
    }
}

const getTestbyCode = async(req, res = response) => {
    const code = req.params.code;
    console.log(code)

    try {
        const test = await Test.findOne({
            code
        })


        const id = test._id

        const questions = await Question.find({
            test: id

        })


        res.json({
            ok: true,
            test,
            questions
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact admin",
        });
    }
}

const deleteTest = async(req, res = response) => {
    let id = req.params.id
    Test.findByIdAndRemove(id, (err, testDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!testDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Test not exist'
                }
            })
        }

        res.json({
            ok: true,
            message: 'Test deleted'
        })
    })
}

const clearTest = async(req, res = response) => {
    let id = req.params.id
    console.log(id)
    try {
        await QuestionResponse.deleteMany({
            test: id
        }, (err, objDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!objDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Test not exist'
                    }
                })
            }
        })

        await Question.find({ test: id }, (err, objDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!objDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Questions not exist'
                    }
                })
            }

            objDB.map(async(obj) => {
                await QuestionScore.deleteMany({
                    question: obj._id
                }, (err, objDB) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        })
                    }

                    if (!objDB) {
                        return res.status(400).json({
                            ok: false,
                            err: {
                                message: 'Test not exist'
                            }
                        })
                    }
                })
            })
        })

        await Room.findOneAndDelete({ test: id }, (err, objDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!objDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Room not exist'
                    }
                })
            }
            res.json({
                ok: true,
                message: 'Test cleared'
            })
        })
    } catch (error) {
        console.log(error)
    }

}

const updateTest = async(req, res = response) => {
    let id = req.params.id
    let body = req.body
    Test.findById(id, (err, objDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!objDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Obj not founded'
                }
            })
        }

        objDB.name = body.name
        objDB.code = body.code
        objDB.duration = body.duration

        objDB.save((err, objSaved) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                obj: objSaved
            })
        })
    })
}


module.exports = {
    createTest,
    getAllTests,
    getTestsByTeacher,
    getTestbyCode,
    deleteTest,
    clearTest,
    updateTest
}