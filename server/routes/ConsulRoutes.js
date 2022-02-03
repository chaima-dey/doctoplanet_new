const express = require("express");
const router = express.Router();
const Consul = require("../Models/ConsulModel");

//GET CONSULT
router.get("/get", async (req, res) => {
 
   try {
       const consults = await Consul.find({id_user:req.query.id})
   
     res.send(consults)
   } catch (err) {
    return res.status(422).send(err.message); 
   }
});



//NEW CONSULT
router.post("/create", async (req, res) => {
   
    try {
        const consultation = new Consul({
            ...req.body
        });
 
        await consultation.save();
        return res.status(200).send(consultation);
    } catch (err) {
        return res.status(422).send(err.message);
    }
});



 
module.exports = router;