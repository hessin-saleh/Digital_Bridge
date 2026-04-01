const mongoose = require("mongoose")

const conctedDB = async () => {
    try{
        await mongoose.connect(process.env.URLDB)
        console.log("MongoDB Connected");
        
    }
    catch(err){
        console.error(`Error connecting to MongoDB: ${err.message}`)
    }
} 

module.exports = conctedDB