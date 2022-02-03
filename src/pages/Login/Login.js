/* eslint-disable */
import React, { useEffect, useState,useRef } from "react";
import { Alert } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LoginUser } from "../../actions/UserActions";
import LoginBanner from "../../assets/images/banner/login-banner.png";
import DivError from "../../components/Error/DivError";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

import "./Login.scss";
import _Alert from "../../components/Alert/_Alert";
function Login() {
    const input_1 = useRef(null)
    const input_2 = useRef(null)

  const SuccessReducer = useSelector((state) => state.SuccessReducer);

  const dispatch = useDispatch();
  const [Mail, setMail] = useState("");
  const [Passowrd, setPassowrd] = useState("");
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const location = useLocation();
 
  useEffect(() => {
    if (Error != null){
      window.scrollTo(0, 0);
    }
  }, [Error]);

  useEffect(() => {
    if (location.state) setMail(location.state.mail);
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const element = document.querySelector(".home");
    element.classList.remove("transition_opacity");
  }, []);
 

  const Login = async () => {
     
    const user = {
      email: Mail,
      password: Passowrd,
    };
    var me =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (Passowrd == "" || Mail == "") {
      input_1.current.classList.add("error_input")
      input_2.current.classList.add("error_input")
      setError("Adresse mail ou mot de passe vide");
      return;
    }
    if (!me.test(Mail)) {
      setError("Adresse mail non valide");
      input_2.current.classList.add("error_input")
      setMail("");
      setPassowrd("");
      return;
    }
    setLoading(true);
    const res = await LoginUser(user, dispatch);
    if (res && res.status == 200) {
      setLoading(false);
      window.location.replace("/");
    } else {
      setLoading(false);
      setPassowrd("");
      console.log(res.data)
      if(res.data == "Adresse introuvable") 
      input_1.current.classList.add("error_input")
      if(res.data == "Mot de passe incorrect")
      input_2.current.classList.add("error_input")
      setError(res.data);
    }
  };

   const focus = (num) =>{
    num.current.classList.remove("error_input")
    num.current.classList.add("focus_input")
   }

   const blur = (num) =>{
    num.current.classList.remove("focus_input")
  }

  return (
    <div className="container">
      <div className="Login_container">
        <div className="login_img">
          <img src={LoginBanner} alt="" />
        </div>
        <div className="home transition_opacity form_login tab-pane fade show active">
          <h2 className="mb-3">Se connecter</h2>

          {Error && <DivError message={Error} />}

          {SuccessReducer && (
            <div className="mb-3">
              <_Alert
                close={false}
                variant={"success"}
                text={"Vorte compte a été vérifié"}
              />
            </div>
          )}

          <div className="container_inputs">
            <div className="form-group">
              <input
                ref={input_1}
                onFocus={() => focus(input_1)}
                onBlur={() => blur(input_1)}
                onChange={(e) => setMail(e.target.value)}
                value={Mail}
                type="text"
                className="form-control"
                placeholder="Adresse mail"
              />
            </div>
            <div className="form-group" style={{ top: 68 }}>
              <input
                ref={input_2}
                onFocus={() => focus(input_2)}
                onBlur={() => blur(input_2)}
                onChange={(e) => setPassowrd(e.target.value)}
                value={Passowrd}
                type="password"
                className="form-control"
                placeholder="Mot de passe"
              />
            </div>
          </div>
          <div className="form-group">
            {!Loading ? (
              <button
                type="button"
                className="btn mb-30 btn-lg btn-primary w-100"
                onClick={() => Login()}
              >
                Je me connecte
              </button>
            ) : (
              <button className="btn mb-30 btn-lg btn-primary w-100 loading-btn">
                <Spinner animation="border" role="status" />
              </button>
            )}
            <a href="#formForget" data-toggle="tab">
              Mot de passe oublié ?
            </a>
          </div>
          <div className="text-center mt-40">
            <p className="mt-0">vous n'avez pas de compte?</p>
            <button
              className="btn btn-lg btn-secondary w-100"
              data-toggle="tab"
              onClick={() => navigate("/register")}
            >
              Créer un compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
