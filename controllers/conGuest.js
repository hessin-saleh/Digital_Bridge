
const { nanoid } = require('nanoid')
const Guest = require("../models/Guest")

const  {vliSchemaGustcreat,vliSchemaGustget} = require("../Validation/vliGuest")





const creatMsg =  async(rqs,res) => {
try{


  const {error, value} = vliSchemaGustcreat.validate(rqs.body, {abortEarly:false, stripUnknown: true})

   if (error)return res.status(400).json({ msg: "not valid data intre", data: error.details})
    const {content,expiresInMinutes} = value

   const code = nanoid(5)
const expirationDate = new Date(Date.now() + expiresInMinutes * 60 * 1000);

   const creatmsg = await Guest.create({
    content,expiresAt:expirationDate,code
   }
)

res.status(201).json({ msg: "Created MSG", data:creatmsg})
}
catch(err){
res.status(500).json({ msg: "Server crash", error: err.message })

}

}




const getMsg =  async(req,res) => {
try{
    

   const {error, value} = vliSchemaGustget.validate(req.params, {abortEarly:false, stripUnknown: true})

   if (error)return res.status(400).json({ msg: "not valid data intre", data: error.details})
    const {code} = value
  


// if(code.length !== 5)return res.status(400).json({ msg: "invalid coding"})

const msg = await Guest.findOne({code})


if(!msg) return res.status(404).json({ msg: "not found MSG"})

res.status(200).json({ msg: "Message Found", data:msg})
}
catch(err){
res.status(500).json({ msg: "Server crash", error: err.message })

}

}


module.exports = {creatMsg,getMsg}

