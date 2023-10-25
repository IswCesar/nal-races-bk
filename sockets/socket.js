const { io } = require("../index");
const {
    existRecord,
    saveRecord,
    updateRecord
} = require("../controllers/questionScore");
const { saveResponse } = require("../controllers/questionResponse")
const { existRoomRecord, saveRoomRecord, updateRoomRecord } = require("../controllers/room")
const QuestionScore = require("../models/questionScore");
const QuestionResponse = require("../models/questionResponse");
const Room = require("../models/room");

const mongoose = require('mongoose');

// Mensajes de Sockets
io.on("connection", (client) => {

    client.on("start_evaluation", async(payload) => {
        io.emit('startEvaluation', {
            test: payload.test,
            counter: payload.counter
        })
    });

    client.on("show_winner", async(payload) => {

        const testId = mongoose.Types.ObjectId(payload.test);

        const global = await QuestionResponse.aggregate(
            [
                { $match: { test: testId } },
                {
                    $group: {
                        _id: "$student",
                        total: {
                            $sum: "$score"
                        }
                    }
                },
            ])

        io.emit('showWinner', {
            test: payload.test,
            global
        })

    });

    client.on("send-message", async(payload) => {

        console.log("Send message catched:")
        console.log(payload)

        let exist = await existRoomRecord(payload.test)

        const newRoom = {
            test: payload.test,
            contacts: [payload.student],
            status: payload.status
        }
        if (!exist) {
            let data = await saveRoomRecord(newRoom)
            io.emit('roomCreated', {
                data
            })

        } else {
            let data = await updateRoomRecord(payload)
            io.emit('roomCreated', {
                data
            })
        }
    });

    client.on("set-player", async(payload) => {

        console.log("set-player event catched on server")    

        io.emit('playerSetted', {
            payload
        })
    });

    client.on("character-setted", async(payload) => {
        io.emit('characterSetted', payload)
    });

    client.on("move-character", async(payload) => {
        io.emit('characterMoved', payload)
    });

    client.on("stop-character", async(payload) => {
        io.emit('characterStoped', payload)
    });

    client.on("jump-character", async(payload) => {
        io.emit('characterJumped', payload)
    });

    client.on("winner-character", async(payload) => {
        io.emit('characterWon', payload)
    });

    client.on("new-game", async(payload) => {
        io.emit('gameNew', payload)
    });

    client.on("start-game", async(payload) => {
        io.emit('gameStart', payload)
    });


    client.on("handling-key", async(payload) => {

        console.log("handling-key event catched on server")    

        io.emit('keyboardEvent', {
            payload
        })
    });


    client.on("reconnect_user", async(payload) => {
        console.log("reconnect user called...")
        let obj = await Room.findOne({ test: payload.test });


        let contacts = obj.contacts
        let status = obj.status
        console.log("status;")
        console.log(obj.status)
        console.log("payload")
        console.log(payload.status[0])

        status.map((e) => {
            if (e.student == payload.status[0].student) {
                e.color = 'green'
            }
        })

        console.log(status)

        const updated = await Room.findOneAndUpdate({ _id: obj._id }, {
            contacts,
            status
        }, { new: true });


        io.emit('reconnected', {
            test: payload.test,
            student: payload.student,
            updated
        })
    });

    client.on("close_user", async(payload) => {

        console.log("close user called...")
        let obj = await Room.findOne({ test: payload.test });


        let contacts = obj.contacts
        let status = obj.status
        console.log("status;")
        console.log(obj.status)
        console.log("payload")
        console.log(payload.status[0])

        status.map((e) => {
            if (e.student == payload.status[0].student) {
                e.color = 'red'
            }
        })

        console.log(status)

        const updated = await Room.findOneAndUpdate({ _id: obj._id }, {
            contacts,
            status
        }, { new: true });

        io.emit('closed', {
            test: payload.test,
            student: payload.student,
            updated
        })
    });
});