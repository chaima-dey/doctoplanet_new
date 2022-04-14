 
 const jwt= require('jsonwebtoken')
 require("dotenv").config();
 const User = require("../Models/User");

module.exports = (req,res,next)=>{
    const { authorization } = req.headers;
    const jwtkey = process.env.jwtkey;
 
    //authorization === Bearer sfafsafa
    if(!authorization){
        return res.status(401).send("you must be logged in")
    }
    const token = authorization.replace("Bearer ","");

    jwt.verify(token,jwtkey,async (err,payload)=>{
        if(err){
          return  res.status(401).send("you must be logged in")
        }
     const {userId} = payload;
     const user = await User.findById(userId)
     req.user=user;
     next();
    })
}