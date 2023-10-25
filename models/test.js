const { Schema, model } = require('mongoose');

const TestSchema = Schema({
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "Test",
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    code: {
        type: String
    },
}, {
    timestamps: true,
});

TestSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model("Test", TestSchema);