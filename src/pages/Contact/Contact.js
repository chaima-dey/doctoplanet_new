import React from "react";
import icon1 from "../../assets/images/icon/icon1.png";
import icon2 from "../../assets/images/icon/icon2.png";
import icon3 from "../../assets/images/icon/icon3.png";
import background from "../../assets/images/main-banner/bg1.jpg";
import MED from "../../assets/images/banner/medicament.png";
function Contact() {
  return (
    <>
         {/* <div
        className="home main-banner offre_banner"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="container inner-content">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-7 text-center">
              <h1 className="title-ext text-primary">Contact</h1>
              <h5>
                Ce guide vous aidera à mieux comprendre la prescription de votre
                médecin
              </h5>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-5  text-center">
              <img
                className="img_banner"
                style={{ width: 400 }}
                src={MED}
                alt=""
              />
            </div>
          </div>
        </div>
      </div> */}
      <div className="container" style={{maxWidth:800,marginTop:140}}>
        <div className="heading-bx" style={{ marginBottom: 20 }}>
          <h2 className="title-ext text-secondary">Contactez-nous</h2>
        </div>

        <div className="row">
          <div className="col-lg-12 mb-30">
            <form
              className="form-wraper contact-form ajax-form"
              action="https://meditro.themetrades.com/html/demo/script/contact.php"
            >
              <div className="ajax-message"></div>
              <div className="row">
                <div className="form-group col-md-6">
                  <input
                    name="name"
                    type="text"
                    required
                    className="form-control"
                    placeholder="Nom"
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="email"
                    type="email"
                    required
                    className="form-control"
                    placeholder="Prénom"
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="phone"
                    type="text"
                    required
                    className="form-control"
                    placeholder="Adresse mail"
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="phone"
                    type="text"
                    required
                    className="form-control"
                    placeholder="Téléphone"
                  />
                </div>

                <div className="form-group col-md-12">
                  <textarea
                    name="message"
                    required
                    className="form-control"
                    placeholder="Message"
                  ></textarea>
                </div>

                <div className="col-lg-12">
                  <button
                    name="submit"
                    type="submit"
                    value="Submit"
                    className="btn w-100 btn-secondary btn-lg"
                  >
                    Envoyez
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <section className="section-area section-sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="feature-container feature-bx4 feature4">
                <div className="icon-md feature-icon">
                  <img src={icon1} alt="" />
                </div>
                <div className="icon-content">
                  <h5 className="ttr-title">Contact Number</h5>
                  <br />
                  <p>0033000000</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="feature-container feature-bx4 feature3">
                <div className="icon-md feature-icon">
                  <img src={icon2} alt="" />
                </div>
                <div className="icon-content">
                  <h5 className="ttr-title">Email Address</h5>
                  <br />
                  <p>info@doctoplanet.com</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="feature-container feature-bx4 feature2">
                <div className="icon-md feature-icon">
                  <img src={icon3} alt="" />
                </div>
                <div className="icon-content">
                  <h5 className="ttr-title">Address</h5>
                  <p>38 boulevard Carnot Bureau 3 59000 Lille</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
