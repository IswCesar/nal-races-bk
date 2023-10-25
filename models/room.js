const { Schema, model } = require('mongoose');

const RoomSchema = Schema({
    test: {
        type: Schema.Types.ObjectId,
        ref: "Test",
        required: true,
    },
    contacts: {
        type: [String]
    },
    status: [{
        student: String,
        color: String
    }]
})

RoomSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model("Room", RoomSchema);