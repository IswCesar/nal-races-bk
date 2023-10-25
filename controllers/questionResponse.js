const QuestionResponse = require("../models/questionResponse");
const Question = require("../models/question")

const saveResponse = async(data) => {
    try {

        const question = await Question.findById(data.question)

        let value = 0
        data.response == question.correctAnswer ? value = 1 : value = 0;

        data.score = value
        data["test"] = question.test

        const model = new QuestionResponse(data)
        const obj = await model.save();

        const values = await QuestionResponse.aggregate(
            [
                { $match: { test: question.test } },
                {
                    $group: {
                        _id: "$student",
                        total: {
                            $sum: "$score"
                        }
                    }
                },
            ]
        )

        return values
    } catch (error) {
        return [];
    }
}

module.exports = {
    saveResponse
}