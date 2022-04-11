const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaiementSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  methode: {
    type: String,
    required: true,
  },
  paiement_link: {
    type: String,
    required: true,
  },
  paiement_date: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },
  payed: {
    type: Boolean,
    default: false
  },
});

const PaiementModel = mongoose.model("paiements", PaiementSchema);

module.exports = PaiementModel; 