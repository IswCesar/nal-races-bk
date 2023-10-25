const { response } = require("express");
const QuestionScore = require("../models/questionScore");

const existRecord = async(question = "") => {

    let userExists = await QuestionScore.find({ question }).limit(1).countDocuments() > 0;
    return userExists

}

const saveRecord = async(question = "", option = "", response = "") => {

    let valA = 0;
    let valB = 0;
    let valC = 0;
    let valD = 0;
    let valE = 0;


    switch (option) {
        case "A":
            valA = 1;
            break;
        case "B":
            valB = 1;
            break;
        case "C":
            valC = 1;
            break;
        case "D":
            valD = 1;
            break;
        case "E":
            valE = 0;
            break;
    }
    try {
        const score = new QuestionScore({
            question: question,
            optionA: valA,
            optionB: valB,
            optionC: valC,
            optionD: valD,
            optionE: valE,
            votes: [response]
        })

        const obj = await score.save();
        return obj
    } catch (error) {
        return [];
    }
}

const updateRecord = async(question = "", option = "", response = "") => {
    let data = await QuestionScore.find({ question })
    let valA = parseInt(data[0].optionA);
    let valB = parseInt(data[0].optionB);
    let valC = parseInt(data[0].optionC);
    let valD = parseInt(data[0].optionD);
    let valE = 0;
    let newVotes = data[0].votes
    newVotes.push(response)

    switch (option) {
        case "A":
            valA += 1;
            break;
        case "B":
            valB += 1;
            break;
        case "C":
            valC += 1;
            break;
        case "D":
            valD += 1;
            break;
        case "E":
            valE = 0;
            break;
    }

    let updated = await QuestionScore.findOneAndUpdate({ question }, {
        optionA: valA,
        optionB: valB,
        optionC: valC,
        optionD: valD,
        optionE: valE,
        votes: newVotes
    }, { new: true });

    return updated
}

const getIndividualQuestionData = async(req, res = response) => {

    const id = req.params.id;
    try {
        const data = await QuestionScore.find({
            question: id
        })

        res.json({
            ok: true,
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact admin",
        });
    }

}

const getAllQuestionData = async(req, res = response) => {

    const id = req.params.id;
    try {
        const values = await QuestionResponse.aggregate(
            [
                { $match: { test: id } },
                {
                    $group: {
                        _id: "$student",
                        total: {
                            $sum: "$score"
                        }
                    }
                },
            ])

        res.json({
            ok: true,
            values
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
    existRecord,
    saveRecord,
    updateRecord,
    getIndividualQuestionData,
    getAllQuestionData
}