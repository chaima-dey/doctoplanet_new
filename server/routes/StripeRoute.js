const express = require("express");
const router = express.Router();
const Consult = require("../Models/ConsulModel");
//REGISTER USER
router.post("/add_product", async (req, res) => {

  const stripe = require('stripe')('sk_test_51KehaDJo0GAssExxzD8KMr3HJvUfA0IPAOMFBlmA5u9fk5jvH5zCxfdEXEejJKQ5BvJkCpHGyit2xs6r4DgcJF0500vQDPDGBe');

  // const price = await stripe.prices.create({
  //   unit_amount: 3600,
  //   currency: 'eur',
  //   product: 'prod_LAHzxRMgiO6Jt2',
  // });




  try {

    const session = await stripe.checkout.sessions.create({
      success_url: `https://doctoplanet.com/stripe/success?id=${req.body._id}`,
      // success_url: `http://localhost:5000/stripe/success?id=${req.body._id}`,
      cancel_url: `https://doctoplanet.com/`,
      line_items: [{ price: "price_1KeheVJo0GAssExxk4eKSOcJ", quantity: 1 }],
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
    res.redirect("https://doctoplanet.com/")
  }

});


router.get("/success", async (req, res) => {
 
  try {
    const consult = await Consult.findByIdAndUpdate(req.query.id, { stripe_link: "",payement_id:"", etat: 1 }, { new: true })
    res.redirect("https://doctoplanet.com/consultations")
  } catch (error) {
    console.log(error)
    res.redirect("https://doctoplanet.com/")
  }
})



module.exports = router;