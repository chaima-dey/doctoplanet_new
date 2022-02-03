import React from "react";
import background from "../../assets/images/background/footer.jpg";
import LOGO from "../../assets/images/Docto_LOGO.png";
import icon3 from "../../assets/images/icon/icon3.png";
import icon2 from "../../assets/images/icon/icon2.png";

function Footer() {
  return (
    <footer>
      <div
        className="footer"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
        }}
      >
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="widget widget_info">
                  <div className="footer-logo mb-4">
                    <a href="index-2.html">
                      <img src={LOGO} alt="" />
                    </a>
                  </div>
                  <div className="ft-contact mb-3">
                  <div className="icon-md feature-icon">
                  <img className='footer_icon' src={icon2} alt="" />
                </div>
                    <p>38 boulevard Carnot Bureau 3 <br /> 59000 Lille</p>
                  </div>
                  <div className="ft-contact">
                  <div className="icon-md feature-icon">
                  <img className="footer_icon" src={icon3} alt="" />
                </div>
                    <p>info@doctoplanet.com</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-6">
                <div className="widget footer_widget ml-50">
                  <h3 className="footer-title">Liens Utiles</h3>
                  <ul>
                    <li>
                      <a href="https://www.conseil-national.medecin.fr/annuaire">
                        <span>Annuaire des médecins du CNOM</span>
                      </a>
                    </li>
                    <li>
                      <a href="http://www.ordre-chirurgiens-dentistes.fr/annuaire/">
                        <span>
                          Annuaire des chirurgiens-dentistes de l'ONCD
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.conseil-national.medecin.fr/">
                        <span>Ordre National des Médecins</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.ordre-chirurgiens-dentistes.fr/">
                        <span>Ordre National des Chirurgiens-Dentistes</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-6">
                <div className="widget footer_widget">
                  <h3 className="footer-title">A Propos De DoctoPlanet</h3>
                  <ul>
                    <li>
                      <a href="/">
                        <span>Conditions générales d'utilisation</span>
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <span>
                          Politique relative à la protection des données
                          personnelles
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="footer-bottom">
            <div className="row">
              <div className="col-12 text-center">
                <p className="copyright-text pt-3 pb-3">
                  Copyright © 2021 Design & Developed by{" "}
                  <span className="text-secondary">DoctoPlanet</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
