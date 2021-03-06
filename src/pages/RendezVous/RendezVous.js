/* eslint-disable */
import React, { useState, useMemo, useEffect, useRef } from "react";
import "./rendezvous.scss";
import countryList from "react-select-country-list";
import FormConsult from "./FormConsult";
import DateConsult from "./DateConsult";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import url from "../../api";
import DivError from "../../components/Error/DivError";
import PlacesAutocomplete from 'react-places-autocomplete';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import PaysList from './pays'
import _Alert from "../../components/Alert/_Alert";
var validator = require("email-validator");
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
function RendezVous() {



  const element = useRef(null)
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const UserReducer = useSelector((state) => state.UserReducer);
  const [Loading, setLoading] = useState(false);

  const options = useMemo(() => countryList().getData(), []);
  const [count, setcount] = useState(1);
  const [Nom, setNom] = useState(UserReducer.nom ? UserReducer.nom : '');
  const [Prenom, setPrenom] = useState(UserReducer.prenom ? UserReducer.prenom : '');
  const [Mail, setMail] = useState(UserReducer.email ? UserReducer.email : '');
  const [Tel, setTel] = useState(UserReducer.tel ? UserReducer.tel : '');
  const [Date_naissance, setDate_naissance] = useState(UserReducer.date_naissance ? UserReducer.date_naissance : '');
  const [Groupe, setGroupe] = useState("O-");
  const [Adresse, setAdresse] = useState(UserReducer.adresse ? UserReducer.adresse : '');
  const [Ville, setVille] = useState("");
  const [Pays, setPays] = useState("France");
  const [Asymptotes, setAsymptotes] = useState([]);
  const [Date_consul, setDate_consul] = useState(new Date());
  const [Heure_consul, setHeure_consul] = useState("");
  const [Medecin, setMedecin] = useState("G??n??raliste");
  const [Etat_Patient, setEtat_Patient] = useState("");
  const [Error, setError] = useState(false)
  const [adress, setadress] = useState("")
  const [ErrorServer, setErrorServer] = useState(false)
  const SuccessReducer = useSelector((state) => state.SuccessReducer);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    navigate("/consultations")
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [count]);
  useEffect(() => {
    const element = document.querySelector(".home");
    element.classList.remove("transition_opacity");
     
  }, []);

  useEffect(() => {
    setErrorServer(false)
  }, [count])

 
  const SaveConsultation = async () => {

    const consultation = {
      id_user: UserReducer._id ? UserReducer._id : '',
      nom: Nom,
      prenom: Prenom,
      email: Mail,
      tel: Tel,
      date_naissance: Date_naissance,
      groupe_sang: Groupe,
      adresse: Adresse,
      ville: Ville,
      pays: Pays,
      asymptotes: Asymptotes,
      date_consul: Date_consul,
      heure_consul: Heure_consul,
      medecin: Medecin,
      option: Etat_Patient,

    };
    if (consultation.heure_consul == '') {
      return
    }
   
   
    try {
      setLoading(true);
      const res = await axios.post(
        `${url}/consultation/create`,
        consultation
      );
      setLoading(false);
      setcount(1)
      dispatch({
        type: "SetSuccess",
        payload: "Votre consultation a ??t?? enregistr?? avec succ??s",
      });
    } catch (error) {
      setErrorServer(true)
      window.scrollTo(0, 0);
      setLoading(false);
    }
  };

  const NextStep = () => {
    setError(false)
    const input = document.querySelector('.input_nom')
    element.current.scrollIntoView()
    if (Nom == '') {
      setError('Veuillez entrer votre nom')
      input.classList.add('error_input')
      return
    }
    else input.classList.remove('error_input')
    if (Prenom == '') {
      setError('Veuillez entrer votre pr??nom')
      const element = document.querySelector('.input_prenom')
      element.classList.add('error_input')
      return
    }
    else {
      const element = document.querySelector('.input_prenom')
      element.classList.remove("error_input")
    }
    if (!validator.validate(Mail)) {
      setError('Veuillez entrer votre adresse mail ')
      const element = document.querySelector('.input_mail')
      element.classList.add('error_input')
      return
    }
    else {
      const element = document.querySelector('.input_mail')
      element.classList.remove("error_input")
    }
    if (Tel == "") {
      //   const element = document.querySelector('.react-tel-input')
      // element.childNodes[1].classList.add('error_input')
      setError("Veuillez saisir votre T??l??phone");
      // const element = document.querySelector('.input_tel')
      // element.classList.add('error_input')
      return;
    }
    else {
      // const element = document.querySelector('.react-tel-input')
      // element.childNodes[1].classList.remove('error_input')
    }

    if (Date_naissance == '') {
      setError('Veuillez entrer votre date de naissance')
      const element = document.querySelector('.input_date')
      element.classList.add('error_input')
      return
    }
    else {
      const element = document.querySelector('.input_date')
      element.classList.remove("error_input")
    }
    if (Adresse == '') {
      setError('Veuillez entrer votre Adresse')
      const element = document.querySelector('.input_adresse')
      element.classList.add('error_input')
      return
    }
    else {
      const element = document.querySelector('.input_adresse')
      element.classList.remove("error_input")
    }


    if (Asymptotes.length == 0 && count > 1) {
      return
    }
    if (count < 3) setcount(count + 1);
  }

  const handleChange = address => {
    setadress(address)
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  const focus_phone = () => {
    const element = document.querySelector('.input-phone')
    element.classList.remove("error_input");

  }

  const blur_phone = (num) => {
    const element = document.querySelector('.input-phone')
    element.classList.remove("focus_input");
  };




  return (


    <>

      <Modal show={SuccessReducer.length > 1} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title className="modal-success-title">
          <i className="fas fa-check-circle"></i>
            Votre consultation a ??t?? enregistr?? avec succ??s
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>

          <Button variant="primary" onClick={() => navigate("/consultations")} >
            Voir Consultations
          </Button>
        </Modal.Footer>
      </Modal>
      {/* {SuccessReducer.length > 0 && <_Alert variant={"success"} text={"Consultation enregistr??e avec succ??s"} />
      } */}
      <div className="transition_opacity home container " >

        <div className="heading-bx" style={{ marginTop: 120, marginBottom: 70 }}>
          <h1 ref={element} className="title-ext text-secondary">Prendre un rendez-vous en ligne</h1>
          <h6 style={{ paddingLeft: 15 }}>
            <i className="fas fa-user-shield"></i>
            Les donn??es de sant?? sont prot??g??es
          </h6>
          <hr />
          {
            ErrorServer &&
            <DivError hideAlert={() => setErrorServer(false)} message={"Un erreur se produit"} />
          }
        </div>
        <div className="appointment-form rendez_vous_form form-wraper">
          <div style={{ display: count == 1 ? "block" : "none" }}>
            <h3 className="title">1- Inforamtions du patient</h3>
            {Error && (
              <div className="alert_hide">
                <DivError hideAlert={() => setError(false)} message={Error} />
              </div>
            )}
            <div className="row_group">
              <div className="form-group">
                <input
                  style={{ backgroundColor: UserReducer.nom && UserReducer.nom == Nom ? '#00a9dd26' : '' }}
                  value={Nom}
                  onChange={(e) => setNom(e.target.value)}
                  type="text"
                  className="form-control input_nom"
                  placeholder="Nom"
                />
              </div>
              <div className="form-group">
                <input
                  style={{ backgroundColor: UserReducer.prenom && UserReducer.prenom == Prenom ? '#00a9dd26' : '' }}
                  value={Prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  type="text"
                  className="form-control input_prenom"
                  placeholder="Pr??nom"
                />
              </div>
            </div>
            <div className="form-group"

            >
              <input
                style={{ backgroundColor: UserReducer.email && UserReducer.email == Mail ? '#00a9dd26' : '' }}
                value={Mail}
                onChange={(e) => setMail(e.target.value)}
                type="mail"
                className="form-control  input_mail"
                placeholder="Adresse mail"
              />
            </div>
            <div style={{ backgroundColor: '#00a9dd26' }} className="form-group">
              <PhoneInput


                className="input-phone"
                onFocus={() => focus_phone()}
                onBlur={() => blur_phone()}
                enableLongNumbers={false}
                country={'fr'}
                placeholder='T??l??phone'
                value={Tel}
                onChange={phone => setTel(phone)}

              />
            </div>

            <div className="row_group">
              <div className="form-group">
                <label htmlFor="">Date de naissance</label>
                <input
                  style={{ backgroundColor: UserReducer.date_naissance && UserReducer.date_naissance == Date_naissance ? '#00a9dd26' : '' }}
                  value={Date_naissance}
                  onChange={(e) => setDate_naissance(e.target.value)}
                  type="date"
                  className="form-control input_date"
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Groupe sanguin</label>
                <select


                  onChange={(e) => setGroupe(e.target.value)}
                  style={{ height: 60 }}
                  className={"form-select "}
                >
                  <option value="">Je ne sais pas</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>

                </select>
              </div>
            </div>
            <div className="form-group">
              <input
                value={Adresse}
                style={{ backgroundColor: UserReducer.adresse && Adresse == UserReducer.adresse ? '#00a9dd26' : '' }}
                onChange={(e) => setAdresse(e.target.value)}
                type="text"
                className="form-control input_adresse"
                placeholder="Adresse "
              />
            </div>
            <div className="row_group">
              <div className="form-group">
                <input
                  value={Ville}
                  onChange={(e) => setVille(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Ville"
                />
              </div>
              <div className="form-group">
                <select
                  onChange={(e) => setPays(e.target.value)}
                  className="form-select"
                >
                  <option id='222'>Pays</option>
                  {PaysList.map((el, index) => (
                    <option key={index} value={el.name}> {el.name} </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div style={{ display: count == 2 ? "block" : "none" }}>
            <FormConsult setAsymptotes={(asyms) => setAsymptotes(asyms)} />
          </div>
          <div style={{ display: count == 3 ? "block" : "none" }}>
            <DateConsult
              setDate_consul={(e) => setDate_consul(e)}
              setHeure_consul={(e) => setHeure_consul(e)}
              setMedecin={(e) => setMedecin(e)}
              setEtat_Patient={(e) => setEtat_Patient(e)}
            />
          </div>

          <div className={"btn_form mt-5 " + (count > 2 ? " btn_form_setp3" : "")}>
            {count > 1 && (
              !Loading &&
              <button
                style={{ marginRight: 10 }}
                onClick={() => {
                  if (count > 1) setcount(count - 1);
                }}
                className="btn btn-secondary"
              >
                Retour
              </button>
            )}
            {count < 3 && (
              <button
                style={{ marginLeft: "auto" }}
                onClick={() => NextStep()}
                className="btn btn-secondary"
              >
                Suivant
              </button>
            )}
            {count == 3 && (
              <>
                {!Loading ? (
                  <button
                    onClick={() => SaveConsultation()}
                    className="btn btn-primary shadow"
                  >
                    Demander une consultation
                  </button>
                ) : (
                  <Spinner
                    animation="border"
                    className=" mt-5"
                    role="status"
                    style={{ color: "#008fbb" }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RendezVous;
