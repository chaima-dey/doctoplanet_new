const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// import multer
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const Token = require("../Models/TokenModels");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require('path');
//REGISTER USER
router.post("/signup", async (req, res) => {
     
  
    const mail_isExist = await User.findOne({ email: req.body.user.email.toLowerCase() });

    // if (mail_isExist) {
    //     res.status(404).send("Adresse mail existe");
    //     return;
    // }
    
    const hashPassowrd = await bcrypt.hash(req.body.user.password, 10);
    try {
        const user = new User({
            nom: req.body.user.nom,
            prenom: req.body.user.prenom,
            email: req.body.user.email.toLowerCase(),
            password: hashPassowrd,
            date_naissance: req.body.user.date_naissance,
            tel: req.body.user.tel,
            image: "",
            created_at: req.body.user.created_at
        });
 
        await user.save();

        let token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
          const url = `http://localhost:5000/user/verify/${user._id}/${token.token}`;
        //  const url = `https://doctoplanet.com/user/verify/${user._id}/${token.token}`;
        const mail_sned = await sendmail(req.body.user.email.toLowerCase(),url,req.body.user.nom)
        
      //  if(!mail_sned.accepted)
      //    return res.status(422).send("Erreur serveur, essayez encore")
        return res.status(200).send(user);
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.get("/verify/:id/:token", async (req, res) => {
   

    try {
      const user = await User.findOne({ _id: req.params.id });
    
      
      if (!user)  return  res.sendFile(path.join(__dirname+'/html/error.html'));
    
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return  res.sendFile(path.join(__dirname+'/html/error.html'));
     
      const uploaded = await User.findByIdAndUpdate(req.params.id,{ verify : true},{new: true})
   
      await Token.findByIdAndRemove(token._id);
      res.sendFile(path.join(__dirname+'/html/verifie.html'));
    
    } catch (error) {
      res.status(400).send("An error occured");
    }
  });

//Login USER
router.post("/signin", async (req, res) => {
    const jwtkey = process.env.jwtkey;
 
    const mail = req.body.user.email.toLowerCase();
    const password = req.body.user.password;

    const user = await User.findOne({ email: mail });

    //  Email Exist?
    if (user) {
        const passwords_compare = await bcrypt.compare(
            req.body.user.password,
            user.password
        );
        if (passwords_compare) {
            const token = jwt.sign({ userId: user._id }, jwtkey);
          if(!user.verify) return res.status(404).send("Adresse mail non vérifiée");
          user.password = null
            res.status(200).send({ token, user });
        } else res.status(404).send("Mot de passe incorrect");
    } else {
        res.status(404).send("Adresse introuvable");
    }
});
 
//UPFATE IMAGE
router.post("/update", async (req, res) => {
 
    try {
        const uploaded = await User.findByIdAndUpdate(req.body.user.id,
            {nom : req.body.user.Nom ,
            prenom : req.body.user.Prenom,
            date_naissance : req.body.user.Date_naissance,
            tel : req.body.user.Tel,
            adresse : req.body.user.Adresse,
            poids : req.body.user.Poids,
            taille : req.body.user.Taille,
            groupe_sang : req.body.user.Groupe
        },

            {new: true})  
            
            res.send(uploaded)
    } catch (error) {
        console.log(error)
        res.status(404).send("Error updating");
    }
 
});

 
//UPDATE IMAGE

// storage multer
const storage = multer.diskStorage({
    destination: function(req, res, callback) {
      callback(null, "uploads");
    },
    // extension
    filename: async (req, file, callback) => {
      callback(null,uuidv4()  +'-'+ file.originalname)
  
    }, 
  });
  
  // init multer
  const upload = multer({
    storage: storage,
  }); 
  
  
  router.post("/uploadimage", upload.single("file"), async (req, res) => {    
   const uploaded = await User.findByIdAndUpdate(req.body.user,{ image : req.file.filename},{new: true})
   res.send(uploaded)
  });

  const sendmail = async (mail,url,username) => {

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
      from: `"Doctoplanet" contact@doctoplanet.com`, // sender address
      to: `${mail}`, // list of receivers
      subject: "Verification Adresse mail", // Subject line
      text: "DoctoPlanet", // plain text body
      html:  `
     
      <div style="max-width: 500px;
      margin: auto;
      background-color: #9e9e9e1a;
      padding: 30px;font-family: system-ui;border: 1px solid #cbcbcb;">
     <div style="display: flex;justify-content: center;align-items: center;">
      <img style="width: 200px;margin: auto;" src="https://res.cloudinary.com/dg3ftjfp0/image/upload/v1643880068/download_vfvl5h.png" alt="">
  
     </div>
        <h2>Confirmation compte Doctoplanet</h2>  
          
          <b>Bonjour ${username}</b> <br>
           Merci d'avoir rejoint Doctoplanet.     
           Nous aimerions vous confirmer que votre compte a été créé avec succès. Pour accéder au compte, cliquez sur le lien ci-dessous
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
       href="${url}">Confirmer votre profil</a>
       </div>
           <br />  
           
        <p style="margin:0">Si vous rencontrez des difficultés pour vous connecter à votre compte, contactez-nous.</p>
           Cordialement<br />  
           L'équipe du Doctoplanet.
      </div>
      `
    });
    return info
  } catch (error) {
    return error
  }
  
 
  
   }
module.exports = router;