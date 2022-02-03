const express = require("express");
const router = express.Router();
const MED = require("../database/Data.json")
//REGISTER USER
router.post("/medicament", async (req, res) => {
 
 
 
    let matches = MED.filter(state =>{
        const regex = new RegExp(`^${req.body.text}`, 'gi')
        return state.title.match(regex)
    })
  
    res.send(matches.slice(0, req.body.pagination))
 
  
   
});

router.post("/laboratoire", async (req, res) => {
 
 
 
    let matches = MED.filter(state =>{
        
        return state
    })
  
    res.send(matches.slice(0, 200))
 
  
   
});



 
module.exports = router;