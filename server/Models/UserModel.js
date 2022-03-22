const mongoose = require("mongoose");
const UserShema = mongoose.Schema({
  admin: {
    type: Boolean,
    default: false
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  sexe: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
    minlength: 5,
  },
  date_naissance: {
    type: String,
    required: true,
  },

  tel: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null
  },
  poids: {
    type: String,
    default: ""
  },
  taille: {
    type: String,
    default: ""
  },
  groupe_sang: {
    type: String,
    default: ""
  },
  verify: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: String,
  }

});

const User = mongoose.model("User", UserShema);

module.exports = User;