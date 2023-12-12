/**
 * path: api/room
 */

const { cleanRoom } = require("../controllers/room")


const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

router.get("/clear/:test", cleanRoom)
module.exports = router