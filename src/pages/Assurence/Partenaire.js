import React from 'react'
import AxaLogo from "../../assets/images/axa-logo.png";
import DashLogo from "../../assets/images/dash-logo.png";
function Partenaire() {
    return (
        <section className="section-sp1 about-area">
        <div className="container">
          <div className="row align-items-center">
            <div className=" mb-30">
              <div className="heading-bx">
                <h6 className="title-ext text-secondary">
                  Assurez la santé de vos proche <br /> en <b>Haïti</b> et en{" "}
                  <b>Afrique de l'Ouest</b>{" "}
                </h6>
                <h4 className="title">
                <i className="fas fa-arrow-right"></i>  Découvrez nos partenaires en Haïti et en Afrique de l'Ouest
                </h4>
              </div>
              <div className="row">
                
                <div className="col-6 text-center">
                  <img className="logo_partenaire" src={DashLogo} alt="" />
                </div>
                <div className="col-6 text-center">
                  <img className="logo_partenaire" src={AxaLogo} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Partenaire
