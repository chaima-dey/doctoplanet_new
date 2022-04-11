const mongoose = require("mongoose");
const ConsulShema = mongoose.Schema({

    id_user: {
        type: String,
    },
    nom: {
        type: String,
 
    },
    prenom: {
        type: String,
      
    },

    email: {
        type: String,
        
    },
    tel: {
        type: String,
    
    },
    date_naissance: {
        type: String,
        
    },
    groupe_sang: {
        type: String,
        
    },

    adresse: {
        type: String,
       
    },
    ville: {
        type: String,
      
    },
    pays: {
        type: String,
       
    },
    asymptotes: [],
    date_consul: {
        type: String,
       
    },
    heure_consul: {
        type: String,
        
    },
    medecin: {
        type: String,
      
    },
    option: {
        type: String,
    },
    paiement_link: {
        type: String,
    },
    paypal_id: {
        type: String,
    },
    etat: {
        type: Number,
        default: 0
      },

});

const Consul = mongoose.model("Consultation", ConsulShema);

module.exports = Consul;