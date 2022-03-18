const express = require("express");
const router = express.Router();
const Consult = require("../Models/ConsulModel");

//REGISTER USER
router.post("/add_product", async (req, res) => {

  const stripe = require('stripe')('sk_test_51KTw0sDydD2n66yCibSvhb0gn4iqLFbrIs0mp15oHWVFv3IJuTbxyiUOShSiskVhtCcLZBEsP0Y0uYLKwnvcff3U00MuFEyYhI');

  const price = await stripe.prices.create({
    unit_amount: 3600,
    currency: 'eur',
    product: 'prod_LAHzxRMgiO6Jt2',
  });




  try {

    const session = await stripe.checkout.sessions.create({
      success_url: `http://localhost:5000/stripe/success?id=${req.body._id}`,
      cancel_url: `http://localhost:5000/cancel.html`,
      line_items: [{ price: "price_1KefiRDydD2n66yCSSc0xu4X", quantity: 1 }],
      mode: 'payment',
    });
 
    //     const paymentLink = await stripe.paymentLinks.create({
    //       line_items: [{price: price.id, quantity: 1}],
    //       after_completion: {type: 'redirect', redirect: {url: `http://localhost:5000/stripe/success?id=${req.body._id}`}},
    //     });
    //   console.log(paymentLink)
    
    const consult = await Consult.findByIdAndUpdate(req.body._id, { stripe_link: session.url, payement_id: session.id }, { new: true })

    return res.status(200).send({ consult, url: session.url })
  } catch (error) {
    console.log(error)
    res.redirect("http://localhost:3001/")
  }

});


router.get("/success", async (req, res) => {
  console.log(req.query.id)
  try {
    const consult = await Consult.findByIdAndUpdate(req.query.id, { stripe_link: "",payement_id:"", etat: 1 }, { new: true })
    res.redirect("http://localhost:3001/consultations")
  } catch (error) {
    console.log(error)
    res.redirect("http://localhost:3001/")
  }
})



module.exports = router;