/* eslint-disable */
import React, { useEffect } from "react";
import image_banner from "../../assets/images/banner/offre_banner.png";
import trangle_orange from "../../assets/images/shap/trangle-orange.png";
import plus_orange from "../../assets/images/shap/plus-orange.png";
import wave_orange from "../../assets/images/shap/wave-orange.png";
import background from "../../assets/images/main-banner/bg1.jpg";
import Maladie from "../../components/Maladie/Maladie";
import Png from "../../assets/images/png.png";

import "./Offre.scss";
function Offres() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const element = document.querySelector(".home");
    element.classList.remove("transition_opacity");
  }, []);
  return (
    <>
      <div
        className="home main-banner offre_banner transition_opacity"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="container inner-content">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-7 text-center">
              <h1 className="title-ext text-primary">
                Un médecin, immédiatement
              </h1>
              <p>• Praticiens disponibles 7j/7 de 7h à minuit .</p>
              <p>• Consultez en vidéo pour une prise en charge rapide</p>
              <h3>36 €/ Téléconsultation</h3>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-5  text-center">
              <img
                className="img_banner"
                style={{ width: 400 }}
                src={Png}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="heading-bx container mt-5 mb-5"
        style={{ display: "grid" }}
      >
        <h5 className="title-ext text-secondary text-center">
          80% de vos questions médicales peuvent être traitées à distance
        </h5>
        <h5 className="text-center">
          Les motifs de consultation vidéo les plus fréquents :
        </h5>
        <div className="maladie">
          <div>
            <li>Mal de dos</li>
            <li>Contraception Saignement de nez</li>
            <li>Diabète</li>
            <li>Syndrôme grippal</li>
            <li>Rapports non protégés</li>
            <li>Insomnie</li>
            <li>Anxiété</li>
          </div>
          <div>
            <li>Mal de dos</li>
            <li>Contraception Saignement de nez</li>
            <li>Diabète</li>
            <li>Syndrôme grippal</li>
            <li>Rapports non protégés</li>
            <li>Insomnie</li>
            <li>Anxiété</li>
          </div>
          <div>
            <li>Mal de dos</li>
            <li>Contraception Saignement de nez</li>
            <li>Diabète</li>
            <li>Syndrôme grippal</li>
            <li>Rapports non protégés</li>
            <li>Insomnie</li>
            <li>Anxiété</li>
          </div>
        </div>
      </div>
    </>
  );
}

export default Offres;
