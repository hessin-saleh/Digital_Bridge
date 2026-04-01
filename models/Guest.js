const mongoose = require("mongoose")

const GuestSchema = new mongoose.Schema({
    content:{
        type:String,
        required: true
    },
    code:{
        type:String,
        required: true,
        unique: true

        
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    expiresAt: {
        type:Date,
        required: true,
        expires: 0

        
    }
})


const Guest = mongoose.model("GUEST", GuestSchema)
module.exports = Guest;

// module.exports = mongoose.model("GUEST", GuestSchema)