const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const authMiddleware = require('../Middlewear/middlewear')

router.get("/", async (req, res) => {
  if(req.user){
    const user = await User.find();
    res.send(user)
  }
  else{
    res.send("you need to login ") 
  }

 
});
module.exports = router;
