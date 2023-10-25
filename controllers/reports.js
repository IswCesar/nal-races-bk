const { response } = require("express")
const QuestionResponse = require("../models/questionResponse");
const Question = require("../models/question");

var ObjectID = require("mongodb").ObjectID;

const getResultsForTest = async(req, res = response) => {

    try {

        var id = new ObjectID(req.params.test);

        var total = await Question.find({ test: id }).countDocuments()

        const data = await QuestionResponse.aggregate(
            [
                { $match: { test: id } },
                {
                    $group: {
                        _id: "$student",
                        score: {
                            $sum: "$score"
                        }
                    }
                },
                {
                    $set: {
                        total
                    }
                },
            ]
        )

        res.json({
            ok: true,
            data
        })
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getResultsForTest
}