/* eslint-disable */
import React, { useEffect, useState } from "react";
import MainBanner from "../../components/MainBanner/MainBanner";
import img_1 from "../../assets/images/rdv.png";
import img_2 from "../../assets/images/consultation.png";
import png_2 from "../../assets/images/img_4.png";
import paiement_icon from "../../assets/images/paiement_icon.png";
import plus_orange from "../../assets/images/shap/plus-orange.png";
import wave_orange from "../../assets/images/shap/wave-orange.png";
import RDV from "../../components/RDV/RDV";
import Contact from "../Contact/Contact";
import { useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import _Alert from "../../components/Alert/_Alert";
import Input from "../../components/Input/Input";
import Cards from "../../components/Cards/Cards";

function Accueil() {
  const location = useLocation();
  const [AlertShow, setAlertShow] = useState(false);
  const TokenReducer = useSelector((state) => state.TokenReducer);
  const SuccessReducer = useSelector((state) => state.SuccessReducer);
  const dispatch = useDispatch();
  useEffect(()=>{ 
   
    return ()=>{
      dispatch({
        type: "SetSuccess",
        payload: false,
      });
    }
  } ,[])
  useEffect(() => {
    if (SuccessReducer) {
      setTimeout(() => {
        dispatch({
          type: "SetSuccess",
          payload: false,
        });
      }, 3000);
    }
  }, [SuccessReducer]);
  useEffect(() => {
    if (location.state) {
      setAlertShow(true);
      setTimeout(() => {
        setAlertShow(false);
      }, 3000);
      location.state = null;
    }
  }, [location]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const element = document.querySelector(".home");
    element.classList.remove("transition_opacity");
  }, []);
  return ( 
    <div className="home transition_opacity">

{SuccessReducer && <_Alert variant={"success"} text={"Consultation enregistrée avec succés"} />
}
      <MainBanner />
      <section className="section-area work-area mt-5">
        <div className="container">
          <div className="heading-bx">
            <h2 className="title-ext text-secondary">Comment ça marche ?</h2>
            <h4 style={{ paddingLeft: 15, maxWidth: 570 }} className="title">
              Prenez rendez-vous et consultez un médecin en Visio, c’est simple
              économique et facile !
            </h4>
          </div>
          
          <div className="row justify-content-center comment_ça_marche">
            <div className="col-lg-4 col-sm-6 mb-30">
              <div className="work-bx">
                <div className="work-num-bx">
                  <img src={img_1} alt="" />
                </div>
                <div className="work-content">
                  <h5 className="title text-secondary mb-10">1- Demande RDV</h5>
                  <p>Le patient fait sa demande de RDV en ligne</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-30">
              <div className="work-bx">
                <div className="work-num-bx">
                  <img src={paiement_icon} alt="" />
                </div>
                <div className="work-content">
                  <h5 className="title text-secondary mb-10">2- Paiement</h5>
                  <p>Paiement de la consultation en ligne ou par un tiers</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-30">
              <div className="work-bx">
                <div className="work-num-bx">
                  <img src={png_2} alt="" />
                </div>
                <div className="work-content">
                  <h5 className="title text-secondary mb-10">
                    3- Consultation
                  </h5>
                  <p>
                    Le patient reçoit sa confirmation de RDV avec le lien du
                    consultation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className="pt-img3 animate3" src={plus_orange} alt="" />

        <img className="pt-img2 animate2" src={wave_orange} alt="" />
      </section>

      {/* <Cards /> */}
     
      <RDV />
    </div>
  );
}

export default Accueil;
