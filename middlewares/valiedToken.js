const jwt = require("jsonwebtoken")


const valiedToken = async (req,res, next)=>{
    try{
       const auth =  req.headers.authorization
       if (!auth) return res.status(400).json({ msg: "Not sand Token In headers"})
        const token = auth.split(" ")[1]
       const decoded = jwt.verify(token, process.env.SCRETKEY)
       req.user = decoded
        next()
    }
    catch(err){
        res.status(401).json({ msg: "expere token"})
    }
}

module.exports= valiedToken