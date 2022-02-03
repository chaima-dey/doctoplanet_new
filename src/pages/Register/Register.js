/* eslint-disable */
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../actions/UserActions";
import LoginBanner from "../../assets/images/banner/login-banner.png";
import VerifyIcon from "../../assets/images/icon/verify.jpg";
import "./Register.scss";
import DivError from "../../components/Error/DivError";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
var validator = require("email-validator");

function Register() {
  const input_1 = useRef(null);
  const input_2 = useRef(null);
  const input_3 = useRef(null);
  const input_4 = useRef(null);
  const input_5 = useRef(null);
  const input_6 = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Tel, setTel] = useState("");
  const [Mail, setMail] = useState("");
  const [Password, setPassword] = useState("");
  const [Date_naissance, setDate_naissance] = useState("");
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Verification, setVerification] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const element = document.querySelector(".home");
    if (element) element.classList.remove("transition_opacity");
  }, []);

  useEffect(() => {
    if (Error != null) {
      window.scrollTo(0, 0);
    }
  }, [Error]);

  const Register = async () => {
    setError(null);
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    var me =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const user = {
      nom: Nom,
      prenom: Prenom,
      email: Mail,
      password: Password,
      date_naissance: Date_naissance,
      tel: Tel,
      image: null,
      poids: "",
      taille: "",
      groupe_sang: "",
      created_at: Date.now(),
    };
    if (Nom.trim() == "") {
      input_1.current.classList.add("error_input")
      setError("Veuillez saisir votre nom");
      return;
    }
    else{
      input_1.current.classList.remove("error_input")
    }
    if (Prenom.trim() == "") {
      input_2.current.classList.add("error_input")
      setError("Veuillez saisir votre prénom");
      return;
    }
    else{
      input_2.current.classList.remove("error_input")
    }
    if (!me.test(Mail)) {
      input_3.current.classList.add("error_input")
      setError("Adresse mail non valide");
      setMail("");
      return;
    }
    else{
      input_3.current.classList.remove("error_input")
    }
    if (!re.test(Password)) {
      setError(
        " Un mot de passe doit contenir au minimum 8 caractères, à savoir : au moins une lettre minuscule et une lettre majuscule, un caractère spécial et un chiffre."
      );
      input_4.current.classList.add("error_input")
      setPassword("");
      return;
    }
    else{
      input_4.current.classList.remove("error_input")
    }
    if (Date_naissance == "") {
      input_5.current.classList.add("error_input")
      setError("Veuillez saisir votre date de naissance");
      return;
    }
    else{
      input_5.current.classList.remove("error_input")
    }

    if (Tel == "") {
      input_6.current.classList.add("error_input")
      setError("Veuillez saisir votre Téléphone");
      return;
    }
    else{
      input_6.current.classList.remove("error_input")
    }

    setLoading(true);
    const res = await RegisterUser(user);
    if (res.status == 200) {
      setLoading(false);
      setVerification(true);
      // navigate("/login", {
      //   state: { mail: res.data.email },
      // });
      // dispatch({
      //   type: "SetSuccess",
      //   payload: true,
      // });
    } else {
      setLoading(false);
      ResetFields();
      setError(res.data);
    }
  };

  const ResetFields = () => {
    setNom("");
    setPrenom("");
    setTel("");
    setMail("");
    setPassword("");
    setDate_naissance("");
  };

  const handleTel = (e) => {
    if (Tel.length == 1 && e.target.value == "") setTel(e.target.value);
    else if (/^\d+$/.test(e.target.value)) setTel(e.target.value);
  };

  const focus = (num) => {
    num.current.classList.remove("error_input");
    num.current.classList.add("focus_input");
  };

  const blur = (num) => {
    num.current.classList.remove("focus_input");
  };

  return (
    <div className="container">
      {/* <GooglePlacesAutocomplete
      apiKey="AIzaSyAGO__UYNepRhRaXW6VY1Q17OhFtu0kcVc"
    /> */}
      {Verification && (
        <div className="heading-bx container mt-5 mb-5 confirmation_message">
          <img src={VerifyIcon} />
          <h5 className="title-ext text-primary text-center ">
            Mail de confirmation
          </h5>
          <p>
            nous avons envoyé un email à <b>{Mail}</b>
            <br /> pour confirmer la validité de notre adresse email
          </p>
          <hr className="w100" />
          <p>
            si vous n'avez pas reçu d'e-mail{" "}
            <a>Renvoyer un mail de vérification</a>
          </p>
        </div>
      )}
      {!Verification && (
        <div className="Login_container">
          <div className="login_img">
            <img src={LoginBanner} alt="" />
          </div>
          <div className="home transition_opacity form_register tab-pane fade show active">
            <h2 className="mb-3">Je m'enregistre</h2>
            {Error && <DivError message={Error} />}

            {
              <>
                <div className="form-group">
                  <input
                    ref={input_1}
                    onFocus={() => focus(input_1)}
                    onBlur={() => blur(input_1)}
                    value={Nom}
                    onChange={(e) => setNom(e.target.value)}
                    type="text"
                    className={"form-control "}
                    placeholder="Nom"
                  />
                </div>
                <div className="form-group">
                  <input
                    ref={input_2}
                    onFocus={() => focus(input_2)}
                    onBlur={() => blur(input_2)}
                    value={Prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Prénom"
                  />
                </div>

                <div className="form-group">
                  <input
                    ref={input_3}
                    onFocus={() => focus(input_3)}
                    onBlur={() => blur(input_3)}
                    value={Mail}
                    onChange={(e) => setMail(e.target.value)}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>

                <div className="form-group">
                  <input
                    ref={input_4}
                    onFocus={() => focus(input_4)}
                    onBlur={() => blur(input_4)}
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    placeholder="Mot de passe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Date de naissance</label>
                  <input
                    ref={input_5}
                    onFocus={() => focus(input_5)}
                    onBlur={() => blur(input_5)}
                    value={Date_naissance}
                    onChange={(e) => setDate_naissance(e.target.value)}
                    type="date"
                    className="form-control"
                    placeholder="Adresse mail"
                  />
                </div>
                <div className="form-group">
                  <input
                    ref={input_6}
                    onFocus={() => focus(input_6)}
                    onBlur={() => blur(input_6)}
                    value={Tel}
                    onChange={(e) => {
                      handleTel(e);
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Téléphone"
                  />
                </div>
                <div className="form-group">
                  {!Loading ? (
                    <button
                      onClick={() => Register()}
                      type="button"
                      className="btn mb-30 btn-lg btn-primary w-100"
                    >
                      S'enregistrer
                    </button>
                  ) : (
                    <button className="btn mb-30 btn-lg btn-primary w-100 loading-btn">
                      <Spinner animation="border" role="status" />
                    </button>
                  )}
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                    data-toggle="tab"
                  >
                    Vous avez un compte ?
                  </p>
                </div>
              </>
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
