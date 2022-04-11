const express = require("express");
const router = express.Router();
const Consult = require("../Models/ConsulModel");
const Paiement = require("../Models/PaiementModel");
const path = require("path");
const paypal = require('paypal-rest-sdk');


router.post("/stripepay", async (req, res) => {
  const stripe = require("stripe")(
    "sk_test_51KehaDJo0GAssExxzD8KMr3HJvUfA0IPAOMFBlmA5u9fk5jvH5zCxfdEXEejJKQ5BvJkCpHGyit2xs6r4DgcJF0500vQDPDGBe"
  );
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `https://doctoplanet.com/stripe/success_stripe?id=${req.body._id}`,
      //   success_url: `http://localhost:5000/stripe/success?id=${req.body._id}`,
      cancel_url: `https://doctoplanet.com/`,
      line_items: [{ price: "price_1KeheVJo0GAssExxk4eKSOcJ", quantity: 1 }],
      mode: "payment",
    });

    const consult = await Consult.findByIdAndUpdate(
      req.body._id,
      { paiement_link: session.url },
      { new: true }
    );
    // const paiement = new Paiement({
    //   user_id: req.body.id_user,
    //   product_id: req.body._id,
    //   paiement_link: session.url,
    //   methode: "stripe",
    //   paiement_date: Date.now(),
    // });

    // const savedPaiement = await paiement.save();
    return res.status(200).send({ consult });

  } catch (error) {
    res.redirect("https://doctoplanet.com/");
  }
});




router.post("/paypalpay", async (req, res) => {
  paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AdsXw57yawXt9yr0oYZfn72TbK5715CfbapArIm-9zPNIQFoiwJMOhSoMnKpLNIBgOI3puLIFX9qIo3k',
    'client_secret': 'EEL1pRRBGDtG9yBzchFyUvD4olWzlaKjtThi2WAyt6BOnqqBaI5XUTPfAGgYO6bmI6rFELXqzjojlujw'
  });
  console.log(req.body)

  var create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "https://doctoplanet.com/paiement/success_paypal",
      "cancel_url": "https://doctoplanet.com/"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "Consultation",
          "sku": "Consultation",
          "price": "37",
          "currency": "EUR",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "EUR",
        "total": "37.00"
      },
      "description": "This is the payment description."
    }]
  };


  paypal.payment.create(create_payment_json, async (error, payment) => {
    if (error) {
      throw error;
    } else {
      console.log(payment.id);
       await Consult.findByIdAndUpdate(
        req.body._id,
        { paypal_id: payment.id },
        { new: true }
      );
      const my_link = payment.links.filter(el => el.rel == "approval_url")
      return res.send(my_link[0].href)

    }
  });
})



router.get("/success_paypal", async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId
  };

  paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
    if (error) {
      res.sendFile(path.join(__dirname + "/html/error.html"));
      console.log(error.response);
      throw error;

    } else {
        await Consult.findOneAndUpdate({ paypal_id: payment.id }, { etat: 1 },
        { new: true })
      res.sendFile(path.join(__dirname + "/html/SuccessPaiement.html"));
    }
  }); 

});



router.get("/success_stripe", async (req, res) => {
  try {
    const verif = await Consult.findById(req.query.id);
    if (!verif || verif.paiement_link.length < 10) {
      res.sendFile(path.join(__dirname + "/html/error.html"));
      return;
    }
    const consult = await Consult.findByIdAndUpdate(
      req.query.id,
      { paiement_link: "", etat: 1 },
      { new: true }
    );
    res.sendFile(path.join(__dirname + "/html/SuccessPaiement.html"));
  } catch (error) {
    res.sendFile(path.join(__dirname + "/html/error.html"));
  }
});

module.exports = router;
