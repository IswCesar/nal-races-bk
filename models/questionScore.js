const { Schema, model } = require('mongoose')

const QuestionScoreSchema = Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    optionA: {
        type: Number,
    },
    optionB: {
        type: Number,
        required: true
    },
    optionC: {
        type: Number,
        required: true
    },
    optionD: {
        type: Number,
        required: true
    },
    optionE: {
        type: Number,
        required: true
    },
    votes: {
        type: [String]
    }
}, {
    timestamps: true,
})

QuestionScoreSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model("QuestionScore", QuestionScoreSchema);