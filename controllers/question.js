const { response } = require("express");
const Question = require("../models/question");

const createQuestion = async(req, res = response) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.json({
            ok: true,
            question: question
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact admin",
        });
    }
}

const getAllQuestions = async(req, res = response) => {
    const all = await Question.find();
    res.json({
        ok: true,
        questions: all
    })
}

const getQuestionByTest = async(req, res = response) => {

    const id = req.params.test;
    try {
        const questions = await Question.find({
            test: id
        })

        res.json({
            ok: true,
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

const deleteQuestion = async(req, res = response) => {
    let id = req.params.id
    Question.findByIdAndRemove(id, (err, objDB) => {
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
                    message: 'Obj not exist'
                }
            })
        }

        res.json({
            ok: true,
            message: 'Obj deleted'
        })
    })
}

const updateQuestion = async(req, res = response) => {
    let id = req.params.id
    let body = req.body
    Question.findById(id, (err, objDB) => {
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
                    message: 'Question not founded'
                }
            })
        }

        objDB.correctAnswer = body.correctAnswer
        objDB.optionA = body.optionA
        objDB.optionB = body.optionB
        objDB.optionC = body.optionC
        objDB.optionD = body.optionD
        objDB.question = body.question
        objDB.test = body.test

        objDB.save((err, objSaved) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                question: objSaved
            })
        })
    })
}
module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionByTest,
    deleteQuestion,
    updateQuestion
}