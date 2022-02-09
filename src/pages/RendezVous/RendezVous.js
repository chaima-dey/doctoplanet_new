/* eslint-disable */
import React, { useState, useMemo, useEffect } from "react";
import "./rendezvous.scss";
import countryList from "react-select-country-list";
import FormConsult from "./FormConsult";
import DateConsult from "./DateConsult";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import url from "../../api";
function RendezVous() {
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
  const [Date_consul, setDate_consul] = useState("");
  const [Heure_consul, setHeure_consul] = useState("07:00");
  const [Medecin, setMedecin] = useState("Généraliste");
  const [Etat_Patient, setEtat_Patient] = useState("");


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [count]);
  useEffect(() => {
    const element = document.querySelector(".home");
    element.classList.remove("transition_opacity");
  }, []);

 

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
    try {
      setLoading(true);
      const res = await axios.post(
        `${url}/consultation/create`,
        consultation
      );
      setLoading(false);
      navigate("/", {
        state: { consultation_added: true },
      });
      dispatch({
        type: "SetSuccess",
        payload: true,
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="transition_opacity home container my-5">
      <div className="heading-bx" style={{ marginTop: 130, marginBottom: 70 }}>
        <h2 className="title-ext text-secondary">Prendre un rendez-vous</h2>
        <h6 style={{ paddingLeft: 15 }}>
          <i className="fas fa-user-shield"></i>
          Les données de santé sont protégées
        </h6>
      </div>
      <div className="appointment-form rendez_vous_form form-wraper">
        <div style={{ display: count == 1 ? "block" : "none" }}>
          <h3 className="title">1- Inforamtions du patient</h3>
          <div className="row_group">
            <div className="form-group">
              <input
                style={{ backgroundColor: UserReducer.nom && UserReducer.nom == Nom ? '#00a9dd26' : '' }}
                value={Nom}
                onChange={(e) => setNom(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Nom"
              />
            </div>
            <div className="form-group">
              <input
                style={{ backgroundColor: UserReducer.prenom  && UserReducer.prenom == Prenom ? '#00a9dd26' : '' }}
                value={Prenom}
                onChange={(e) => setPrenom(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Prénom"
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
              className="form-control"
              placeholder="Adresse mail"
            />
          </div>
          <div className="form-group">
            <input
              style={{ backgroundColor: UserReducer.tel && UserReducer.tel == Tel ? '#00a9dd26' : '' }}
              value={Tel}
              onChange={(e) => setTel(e.target.value)}
              type="number"
              className="form-control"
              placeholder="Téléphone mobile"
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
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Groupe sanguin</label>
              <select
            

                onChange={(e) => setGroupe(e.target.value)}
                style={{ height: 60 }}
                className={"form-select " }
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
              className="form-control"
              placeholder="Adresse"
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
                <option>Pays</option>
                <option></option>
                {options.map((el, index) => (
                  <option key={index}> {el.label} </option>
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
              onClick={() => {
                if(Asymptotes.length != 3 && count > 1) {
                  return
                }
                if (count < 3) setcount(count + 1);
              }}
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
  );
}

export default RendezVous;
