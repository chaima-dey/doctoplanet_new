const express = require("express");
const router = express.Router();
const Consult = require("../Models/ConsulModel");
const path = require("path");
//REGISTER USER
router.post("/add_product", async (req, res) => {

  const stripe = require('stripe')('sk_test_51KehaDJo0GAssExxzD8KMr3HJvUfA0IPAOMFBlmA5u9fk5jvH5zCxfdEXEejJKQ5BvJkCpHGyit2xs6r4DgcJF0500vQDPDGBe');
<<<<<<< HEAD
=======
 
>>>>>>> d37d5a5f9b13a8f6cf2700541f05df53a9345fb8
  try {

    const session = await stripe.checkout.sessions.create({
       success_url: `https://doctoplanet.com/stripe/success?id=${req.body._id}`,
   //   success_url: `http://localhost:5000/stripe/success?id=${req.body._id}`,
      cancel_url: `https://doctoplanet.com/`,
      line_items: [{ price: "price_1KeheVJo0GAssExxk4eKSOcJ", quantity: 1 }],
      mode: 'payment',
    });
 
<<<<<<< HEAD
=======
  
>>>>>>> d37d5a5f9b13a8f6cf2700541f05df53a9345fb8
    const consult = await Consult.findByIdAndUpdate(req.body._id, { stripe_link: session.url, payement_id: session.id }, { new: true })

    return res.status(200).send({ consult, url: session.url })
  } catch (error) {
  
    res.redirect("https://doctoplanet.com/")
  }

});


router.get("/success", async (req, res) => {
 
  try {
     const verif = await Consult.findById(req.query.id)
     if(!verif || verif.stripe_link.length < 10)
    {
      res.sendFile(path.join(__dirname + "/html/error.html"));
      return
    }
    const consult = await Consult.findByIdAndUpdate(req.query.id, { stripe_link:'' ,etat: 1 }, { new: true })  
    res.sendFile(path.join(__dirname + "/html/SuccessPaiement.html"));
  } catch (error) {
    res.sendFile(path.join(__dirname + "/html/error.html"));
  }
})



module.exports = router;