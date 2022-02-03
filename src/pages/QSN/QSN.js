/* eslint-disable */
import React, { useEffect } from "react";
import Banner from "../../assets/images/banner/QSN_banner.png";
import banner_doctors from "../../assets/images/banner_doctors.png";
import background from "../../assets/images/main-banner/bg1.jpg";
import image_banner from "../../assets/images/banner/offre_banner.png";

import "./QSN.scss";
function QSN() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const element = document.querySelector(".home");
    element.classList.remove("transition_opacity");
  }, []);
  return (
    <>
      <div
        className="transition_opacity home main-banner offre_banner"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="container inner-content">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-7 text-center">
              <h1 className="title-ext text-primary">
                Un médecin, immédiatement
              </h1>
              <h5>
                Rendre la santé accessible à tous et partout dans le monde
              </h5>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-5  text-center">
              <img
                className="img_banner"
                style={{ width: 600 }}
                src={banner_doctors}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container_app container pb-5 " style={{ marginTop: 10 }}>
        <div className="heading-bx">
          <h2 className="title-ext text-secondary">Comment ça marche ?</h2>
          <p className="title">
            En 2020, une mère de famille française d’origine haïtienne, fonde
            Doctoplanet avec l'ambition de révolutionner l’accès aux soins dans
            les zones jusqu’à présent peu ou mal desservies par la médecine.
            D'abord destinée à prise de rendez-vous diagnostic pour les plus
            vulnérables avec une solution informatique dédiée aux utilisateurs,
            Doctoplanet effectue peu après, un virage à 180° en lançant la
            Complémentaire santé Essentiel en partenariat avec un groupe
            d'assurance Francais et l’application proxi-MIT gérant les cas
            d’urgences médicales et psychologiques de proximité.
          </p>
          <p>
            Depuis Doctoplanet poursuit son développement dans le monde avec la
            mise en place de partenariats stratégiques avec les centres et
            groupes hospitaliers des territoires émergents.
          </p>
          <p>
            Doctoplanet compte 10 collaborateurs, médecins chercheurs et
            professionnels de santé et une ambition de développement toujours
            aussi forte sans oublier un engagement inconditionnel pour la
            poursuite des objectifs de développement durables.
          </p>
        </div>
        <div className="heading-bx">
          <h2 className="title-ext text-secondary">Notre Philosophie</h2>
          <p>
            Comme vous, nous sommes convaincus chez DOCTOPLANET, que c'est au
            quotidien que se construit le monde de demain, plus responsable et
            solidaire.
          </p>
          <p>
            Nous avons à cœur notre mission : vous permettre d’avoir un accès
            aux soins depuis n’importe où dans le monde, pendant vos vacances ou
            de prendre soins de vos proches même à l’autre bout du monde.
          </p>
          <p>
            Doctoplanet facilite le traitement de l’urgence médicale en
            réduisant le délai d’intervention des personnels de santé.
          </p>
          <p>
            Doctoplanet forme cette communauté de personnes responsables et
            solidaires
          </p>
        </div>
        <div className="heading-bx">
          <h2 className="title-ext text-secondary">L'équipe Doctoplanet</h2>
          <p>
            L’équipe Doctoplanet est en France. Et est composée de médecins
            chercheurs, d’entrepreneure et de professionnels de l’assurance.
          </p>
        </div>
      </div>
    </>
  );
}

export default QSN;
