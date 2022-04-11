const express = require("express");
const router = express.Router();
const Consult = require("../Models/ConsulModel");
const path = require("path");
const paypal = require('paypal-rest-sdk');
router.post("/checkout", async (req, res) => {
    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'ASkprGU88nGbBoQySz-nLNw_KUT-W-AD03Vdm5Aee-oJHFbGT9votO8wHD1WBdXhaPfNepDSkklYkH07',
        'client_secret': 'EHk7nRT6VnRv6VJcqmtAK-JyFYNTAJFBI2Ukd-MO4zdq5lhwEU1iwunwd0vEo9H4C8DxvGn_2nJsDNo5'
      });
// console.log(req.body)  

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://return.url",
        "cancel_url": "http://cancel.url"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Consultation",
                "sku": "Consultation",
                "price": "37.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "37.00"
        },
        "description": "This is the payment description."
    }]
};
 
 
paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
       
    }
});
})  




module.exports = router;
