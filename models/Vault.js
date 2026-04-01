const mongoose = require("mongoose")

const Vaultschama = mongoose.Schema({
content:{
    type:String,
    required: true
},

createdAt: {
        type:Date,
        default:Date.now
    },
userId:{
    type: mongoose.Schema.ObjectId,
    ref: "USER"
},

tags:{
    type:String,
    enum:["general", "dev", "learn"],
    default: "general"
}

})

const Vault = mongoose.model("VAULT", Vaultschama)
module.exports = Vault;

