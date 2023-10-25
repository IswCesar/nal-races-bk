const { Schema, model } = require('mongoose')

const QuestionResponseSchema = Schema({

    student: {
        type: String,
        required: true
    },
    test: {
        type: Schema.Types.ObjectId,
        ref: "Test",
        required: true,
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true
    },
    response: {
        type: String,
        required: true
    },
    option: {
        type: String,
        required: true
    },
    score: {
        type: Number
    }
}, {
    timestamps: true,
})

QuestionResponseSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model("QuestionResponse", QuestionResponseSchema)