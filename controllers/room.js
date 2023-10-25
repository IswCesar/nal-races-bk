const { response } = require("express");
const Room = require("../models/room");

const existRoomRecord = async(test = "") => {

    let objExist = await Room.find({ test }).limit(1).countDocuments() > 0;
    return objExist

}

const saveRoomRecord = async(data) => {

    try {
        const room = new Room({
            test: data.test,
            contacts: data.contacts,
            status: data.status
        })

        const obj = await room.save();
        return obj
    } catch (error) {
        console.log(error)
        return [];
    }
}

const updateRoomRecord = async(data) => {


    let obj = await Room.findOne({ test: data.test });
    let contacts = obj.contacts
    let status = obj.status


    if (!contacts.includes(data.student)) {
        contacts.push(data.student)
        status.push(data.status[0])

        let updated = await Room.findOneAndUpdate({ _id: obj._id }, {
            contacts,
            status
        }, { new: true });

        return updated
    } else {
        return obj
    }
}

module.exports = {
    existRoomRecord,
    saveRoomRecord,
    updateRoomRecord
}