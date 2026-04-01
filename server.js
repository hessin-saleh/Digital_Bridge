require("dotenv").config()
const express = require("express")
const mongoose= require("mongoose")
const cors = require("cors")
const conctedDB = require("./config/db")
const routGuest = require("./routes/routGuest")
const routUser = require("./routes/routAuth")
const routVault =require("./routes/routVault")
//  conction databes
conctedDB()

const app = express()
//  working in body
app.use(express.json())





// acsses froenend
app.use(cors())

app.use("/guest", routGuest)
app.use("/auth", routUser)
app.use("/vault", routVault)

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is running in ${process.env.PORT || 'development'} mode on port ${port}`)
})