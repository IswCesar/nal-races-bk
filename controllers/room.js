const { response } = require("express");
const Room = require("../models/room");
var ObjectID = require("mongodb").ObjectID;

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

const cleanRoom = async(req, res = response) => {

   

    try {
        const data = req.params.test;
        
        var id = new ObjectID(req.params.test);
        
        
        let obj = await Room.findOne({ test: id });
        console.log(obj);
        let contacts = []
        let status = []
    
    
        let updated = await Room.findOneAndUpdate({ _id: obj._id }, {
            contacts,
            status
        }, { new: true });

        res.json({
            ok: true,
            updated
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
    existRoomRecord,
    saveRoomRecord,
    updateRoomRecord,
    cleanRoom
}