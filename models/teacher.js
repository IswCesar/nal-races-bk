const { Schema, model } = require('mongoose');

const TeacherSchema = Schema({
    username: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

TeacherSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model("Teacher", TeacherSchema)