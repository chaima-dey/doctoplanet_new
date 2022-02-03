/* eslint-disable */
import React from "react";
import image_banner from "../../assets/images/main-banner/doctor.PNG";
import trangle_orange from "../../assets/images/shap/trangle-orange.png";
import plus_orange from "../../assets/images/shap/plus-orange.png";
import wave_orange from "../../assets/images/shap/wave-orange.png";
import background from "../../assets/images/main-banner/bg1.jpg";
import Banner from "../../assets/images/banner/QSN_banner.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function MainBanner() {
  const TokenReducer = useSelector((state) => state.TokenReducer);

  const navigate = useNavigate();
  return (
    <div
      className="home main-banner offre_banner "
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="container inner-content">
        <div className="row align-items-center">
        <div className="col-lg-7 col-md-6 col-sm-7">
            <h2 className="title-ext text-primary">
              Accédez à une consultation 7/7
            </h2>
            <h2>
              Consultez un professionnel de santé depuis n’importe où dans le
              monde.
            </h2>
          {
          !TokenReducer &&
          <button   onClick={() => navigate('/register')}  className="btn btn-secondary btn-lg shadow mt-4">
              Créer un compte ?
            </button>}
          </div>
          <div className="col-lg-5 col-md-6 col-sm-5  text-center">
            
              <img className='img_banner' src={Banner} alt="" />
           
          </div>
        </div>
      </div>
      <img className="pt-img1 animate1" src={trangle_orange} alt="" />
      <img className="pt-img4 animate4" src={plus_orange} alt="" />
      <img className="pt-img5 animate-wave" src={wave_orange} alt="" />
    </div>
  );
}

export default MainBanner;
