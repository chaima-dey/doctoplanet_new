import React from "react";
import Button from "../StripeButton/Button";
import "./OffreCard.scss";
function OffreCard() {
  return (

    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-6 col-md-6 mt-5">
          <div className="appointment-form form-wraper">
            <h3 className="title Title_card_1 "> Carte avantage santé </h3>
            <p>
              Cette carte est spécialement conçue pour répondre à la demande
              de la couverture santé individuelle en Haïti <br />
              • Quel que soit son âge <br />• Quel que soit son état de santé
            </p>
            <p>
              <i className="fas fa-arrow-right"></i> ACCÈS AUX SOINS DE SANTÉ
            </p>
            <h4 className="Title_card_2">1. Soins ambulatoires :</h4>
            • Consultations générales et consultations spécialisées gratuites
            a travers le réseau des centres médicaux du DASH <br />
            <br />
            <div className="background">
              • Médicament sous nom générique pour{" "}
              <h6>50 HTG (équivalent de environ 0.60€) </h6>• Examen de
              laboratoire de base pour{" "}
              <h6> 50 HTG (équivalent de environ 0.60€)</h6>
            </div>
            <br />
            <p>
              {" "}
              • 100 HTG de frais de dossier à payer après le premier
              traitement et après tout traitement dépassant 15 jours.
            </p>
            <hr />

            <h4 className="Title_card_2">2. Soins à l’hôpital :</h4>
            <p>
              • Chambres au tarif le plus bas <br />• Montant forfaitaire pour
              le suivi médical quelle que soit la durée de l’hospitalisation.{" "}
              <br />• Montant forfaitaire pour les chirurgiens
            </p>
            <p>
              {" "}
              quelle que soit l’intervention chirurgicale. Les intrants et
              médicaments utilisés sont à la charge de l’assuré.
            </p>
            <p>
              <i className="fas fa-arrow-right"></i> ACCÈS DIRECT AUX SOINS DE
              SANTÉ
            </p>

            <p>
              {" "}
              Ces soins sont fournis à travers le réseau des 20 centres
              médicaux et hôpitaux du DASH à Port-au-Prince, au Cap Haïtien et
              sur la Côte des Arcadins.
            </p>
            <p>
              <i className="fas fa-arrow-right"></i> ACCÈS IMMÉDIAT AUX SOINS
              DE SANTÉ
            </p>
            <p>
              {" "}
              Ces soins sont fournis immédiatement après que la carte ait été
              achetée quels que soient l’âge et l’état de santé du patient.
            </p>
            <br />
            <h5 className="background"> COÛT DE LA COUVERTURE 25€ / mois</h5>
         
  
            <form  className="mt-5 paypal_btn" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_target">
<input type="hidden" name="cmd" value="_s-xclick" />
<input type="hidden" name="hosted_button_id" value="S2QUJHFS9CFFC" />
<input type="image" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal, le réflexe sécurité pour payer en ligne" />
<img alt="" border="0" src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif" width="1" height="1" />
</form>

<hr /> 
<Button />


            
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 mt-5">
          <div className="appointment-form form-wraper">
            <h3 className="title Title_card_1">Carte pour diaspora</h3>
            <p>
              Cette carte est spécialement conçue pour les haïtiens de la
              diaspora. <br />
              Elle permet aux haïtiens de la diaspora d’offrir une
              assurance-sante à leurs parents et protégés en Haïti quels que
              soient leur âge et leur état de santé, chambre d’hospitalisation
              incluse. Elle garantit :
            </p>
            <p>
              <i className="fas fa-arrow-right"></i> ACCÈS AUX SOINS DE SANTÉ
              QUELS QUE SOIENT L’ÂGE ET L’ÉTAT DE SANTÉ
            </p>
            <h4 className="Title_card_2"> 1. Soins ambulatoires :</h4>
            <div>
              • Consultations générales et consultations spécialisées
              gratuites
              <br />
              <br />
              <div className="background">
                • Médicament sous nom générique pour{" "}
                <h6> 50 HTG (équivalent de environ 0.60€)</h6>• Examen de
                laboratoire de base pour{" "}
                <h6> 50 HTG (équivalent de environ 0.60€)</h6>
              </div>
              <br />• 100 HTG de frais de dossier à payer après le premier
              traitement et après tout traitement dépassant 15 jours.
            </div>
            <hr />
            <h4 className="Title_card_2">2. Soins à l’hôpital :</h4>
            <p>
              • 3 jours de chambre gratuit à chaque hospitalisation
              <br />
              • Montant forfaitaire pour le suivi médical quelle que soit la
              durée de l’hospitalisation
              <br />
              • Montant forfaitaire pour les chirurgiens quelle que soit
              l’intervention chirurgicale
              <br />• Les intrants et médicaments utilisés sont à la charge de
              l’assuré.
            </p>
            <p>
              <i className="fas fa-arrow-right"></i> ACCÈS DIRECT AUX SOINS DE
              SANTÉ
            </p>
            <p>
              Ces soins sont fournis à travers le réseau des 20 centres
              médicaux et hôpitaux du DASH à Port-au-Prince, au Cap Haïtien et
              sur la Côte des Arcadins.
              <br />
              Ces soins sont fournis immédiatement après que la carte ait été
              achetée quels que soient l’âge et l’état de santé du patient.
            </p>
            <h5 className="background"> COÛT DE LA COUVERTURE 35€ / mois</h5>
           
            <form  className="mt-5 paypal_btn" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_target">
<input type="hidden" name="cmd" value="_s-xclick" />
<input type="hidden" name="hosted_button_id" value="RRH9G4LAKA4W2" />
<input type="image" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal, le réflexe sécurité pour payer en ligne" />
<img alt="" border="0" src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif" width="1" height="1" />
</form>

<hr /> 
<Button />


             

          </div>
        </div>
      </div>
    </div>

  );
}

export default OffreCard;
