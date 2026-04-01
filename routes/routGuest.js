const express =  require("express")
const rout = express.Router()
const GuestControl = require("../controllers/conGuest")
rout.post("/create",GuestControl.creatMsg)

rout.get("/:code",GuestControl.getMsg)



module.exports = rout