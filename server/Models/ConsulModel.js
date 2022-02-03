const mongoose = require("mongoose");
const ConsulShema = mongoose.Schema({

    id_user: {
        type: String,
    },
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: true,
    },
    date_naissance: {
        type: String,
        required: true,
    },
    groupe_sang: {
        type: String,
        required: true,
    },

    adresse: {
        type: String,
        required: true,
    },
    ville: {
        type: String,
        required: true,
    },
    pays: {
        type: String,
        required: true,
    },
    asymptotes: [],
    date_consul: {
        type: String,
        required: true,
    },
    heure_consul: {
        type: String,
        required: true,
    },
    medecin: {
        type: String,
        required: true,
    },
    option: {
        type: String,
    },
    etat: {
        type: Number,
        default: 0
      },

});

const Consul = mongoose.model("Consultation", ConsulShema);

module.exports = Consul;