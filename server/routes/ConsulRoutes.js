const express = require("express");
const router = express.Router();
const Consul = require("../Models/ConsulModel");
const nodemailer = require("nodemailer");
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
     
        const email_sneded = await sendmail(req.body)
        console.log(email_sneded) 
        return res.status(200).send(consultation);
    } catch (err) { 
         res.status(422).send("Un erreur se produit");
    }
});


const sendmail = async (username) => {

    try {
      const transporter = nodemailer.createTransport({
        host: "ssl0.ovh.net",
    port: 465,
    secure: true, 
    auth: {
      user: "contact@doctoplanet.com",
      pass: "Goku?vegeta!@123"
    },
          tls:{
        ciphers:'SSLv3'
    }
    })
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `"Doctoplanet" ${username.email}`, // sender address
        to: `contact@doctoplanet.com`, // list of receivers
        subject: "Nouvelle demande de consultation", // Subject line
        text: "DoctoPlanet", // plain text body
        html:  `
        <div style="max-width: 500px;
        margin: auto;
        background-color: #9e9e9e1a;
        padding: 30px;font-family: system-ui;border: 1px solid #cbcbcb;">
       <div style="display: flex;justify-content: center;align-items: center;">
        <img style="width: 200px;margin: auto;" src="https://res.cloudinary.com/dg3ftjfp0/image/upload/v1643880068/download_vfvl5h.png" alt="">
    
       </div>
          <h3>Nouvelle demande de consultation</h3><br>
          <h3 style:"margin:0px">Info Patient :</h3>  
            <b>Parient : </b>${username.nom}${ username.prenom}  <br>
            <b>Email : </b>${username.email} <br>
            <b>Téléphone : </b>${username.tel} <br>
            <b>Adresse : </b>${username.adresse} <br><br>
            <h3 style:"margin:0px">Info Consultation :</h3>  
            <b>Date de consultation : </b>${username.date_consul} <br>
            <b>heure de consultation : </b>${username.heure_consul} <br>
            <b>Medecin : </b>${username.medecin} <br>
            <b>Autre : </b>${username.option} <br>
            
            <br /> <br/>     
         <div>
         <a
         style="    background: #fe5527;
         color: white;
         text-decoration: auto;
         cursor: pointer;
         width: fit-content;
         padding: 10px;
         margin: auto;
         text-align: center;
         border-radius: 9px;"
         href="www.doctoplanet.com">Gestion des Consultations</a>
         </div>
           
             
         
        </div>
        `
      });
      return info
    } catch (error) {
      return error
    }
    
   
    
     }
 
module.exports = router;