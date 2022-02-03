import React, { useEffect } from "react";
import background from "../../assets/images/main-banner/bg1.jpg";
import Png from "../../assets/images/banner/assurence.png";
 

import Partenaire from "./Partenaire";
import OffreCard from "../../components/OffreCard/OffreCard";
function Assurence() {
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
              <h2 style={{ fontSize: 30 }} className="title-ext text-primary">
                Une assurance pour chaque détail de votre vie
              </h2>
              <h3>
                Ne laissez plus votre vie et celle de votre famille entre les
                mains du hasard
              </h3>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-5  text-center">
              <img
                className="img_banner"
                style={{ width: 450 }}
                src={Png}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>



      <div className="container  " style={{ marginTop: 30, marginBottom: 30 }}>
        <div className="heading-bx" style={{ marginBottom: 80 }}>
          <h2 className="title-ext text-secondary">Comment ça marche ?</h2>
          <h4 style={{ paddingLeft: 15, maxWidth: 570 }} className="title">
            Assurez vos bien aimés en 3 étapes
          </h4>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-sm-6 mb-30">
            <div className="work-bx assurence_box">
              <div className="work-num-bx">01</div>
              <div className="work-content">
                <h5 className="title text-secondary mb-10">Choisissez</h5>
                <p>
                  Choisissez la meilleure offre sur le marché des assurances qui
                  convient le mieux à vos proches
                </p>
              </div>
              {/* <a
                href="/"
                onClick={(e) => e.preventDefault()}
                className="btn btn-primary light"
              >
                Voir plus <i className="btn-icon-bx fas fa-chevron-right"></i>
              </a> */}
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 mb-30">
            <div className="work-bx assurence_box">
              <div className="work-num-bx">02</div>
              <div className="work-content">
                <h5 className="title text-secondary mb-10">Inscrivez</h5>
                <p>
                  Renseignez les informations personnelles de vos bénéficiaires.
                  Après qu’ils aient rempli le questionnaire de santé nous
                  créons leur espace personnel.
                </p>
              </div>
              {/* <a
                href="/"
                onClick={(e) => e.preventDefault()}
                className="btn btn-primary light"
              >
                Voir plus <i className="btn-icon-bx fas fa-chevron-right"></i>
              </a> */}
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 mb-30">
            <div className="work-bx assurence_box">
              <div className="work-num-bx">03</div>
              <div className="work-content">
                <h5 className="title text-secondary mb-10">Activez</h5>
                <p>
                  Effectuez le règlement puis signez votre contrat électronique.
                </p>
              </div>
              {/* <a
                href="/"
                onClick={(e) => e.preventDefault()}
                className="btn btn-primary light"
              >
                Voir plus <i className="btn-icon-bx fas fa-chevron-right"></i>
              </a> */}
            </div>
          </div>
        </div>
      </div>
      <Partenaire />
      <OffreCard />
    </>
  );
}

export default Assurence;
