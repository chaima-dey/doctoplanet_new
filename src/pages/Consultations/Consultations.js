/* eslint-disable */
import axios from "axios";
import React, { useState, useEffect } from "react";
import ButtonStripe from "../../components/StripeButton/Button";
import { Button, Modal, Spinner, Tab, Table, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import url from "../../api";
import Icon from "../../assets/images/icon/payments-stripe.png";
import PaypalIcon from "../../assets/images/btn_buynowCC_LG.gif";
import favpng_scroll from "../../assets/images/favpng_scroll-icon.png";
import "./Consultations.scss";
import API from "../../api";
import io from "socket.io-client";

import { FiInfo } from "react-icons/fi";
import { useParams } from "react-router-dom";
const socket = io(API);

function Consultations() {
  const [Allconsult, setAllconsult] = useState([]);
  const [ConsultFiltred, setConsultFiltred] = useState([]);
  const [Filtre, setFiltre] = useState(0);
  const UserReducer = useSelector((state) => state.UserReducer);
  const [modalShow, setModalShow] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [LinkAlert, setLinkAlert] = useState(false);
  const params = useParams();

  const getConsults = async () => {
    const res = await axios.get(`${url}/consultation/get`, {
      params: { id: UserReducer._id },
    });
    setConsultFiltred(res.data);
    setAllconsult(res.data);
  };

  useEffect(() => {
    getConsults();
  }, []);

  useEffect(() => {
    if (Filtre == "Tous") {
      setConsultFiltred(Allconsult);
    }
    if (Filtre == "paiement") {
      const arr = Allconsult.filter((el) => el.etat == 0);
      setConsultFiltred(arr);
    }
    if (Filtre == "Payée") {
      const arr = Allconsult.filter((el) => el.etat == 1);
      setConsultFiltred(arr);
    }
    if (Filtre == "Terminée") {
      const arr = Allconsult.filter((el) => el.etat == 2);
      setConsultFiltred(arr);
    }
  }, [Filtre]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const element = document.querySelector(".home");
  }, []);

  const Paypal = async (props) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/paiement/paypalpay`, {
        prix: "36",
        ...props.show,
      });
      var url = window.location.href;
      if (url.indexOf("?") > -1) {
        url += "&param=1";
      } else {
        url += "?param=1";
      }
        window.location.href = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const PayerStripe = async (props) => {
  
    var url = window.location.href;
    if (url.indexOf("?") > -1) {
      url += "&param=1";
    } else {
      url += "?param=1";
    }
    if (props.show.paiement_link?.length > 10) {
      window.location.href = props.show.paiement_link;
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/paiement/stripepay`, {
        prix: "36",
        ...props.show,
      });
      getConsults();
      setLoading(false);
      setModalShow(null);
      window.location.href = res.data.consult.paiement_link;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const Tables = () => {
    return (
      <>
        {ConsultFiltred.length > 0 && (
          <img className="scroll-png" src={favpng_scroll} alt="" />
        )}
        <Table bordered>
          <thead>
            <tr>
              <th>
                <i className="fas fa-list-ol"></i>
              </th>
              <th>
                <i className="fas fa-user-md"></i> Spécialité
              </th>
              <th>
                {" "}
                <i className="far fa-calendar-alt"></i> Date
              </th>
              <th style={{ width: 110 }}>
                <i className="far fa-clock"></i> Heure
              </th>

              <th>
                <i className="fas fa-ellipsis-h"></i> Etat
              </th>

              <th style={{ width: 200 }}> Actions</th>
            </tr>
          </thead>
          {ConsultFiltred.map((el, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td> {el.medecin} </td>
                <td> {el.date_consul} </td>
                <td> {el.heure_consul} </td>

                <td>
                  {(el.etat == 0 && (
                    <p className="m-0 etat_attente">
                      <i className="fas fa-info-circle"></i>
                      En Paiement
                    </p>
                  )) ||
                    (el.etat == 1 && (
                      <p className="m-0 payee_etat">
                        <i className="fas fa-check-circle"></i> Payée
                      </p>
                    )) ||
                    (el.etat == 2 && <p className="m-0">Terminée</p>)}
                </td>
                <td className="action_consult">
                  {el.etat == 0 && (
                    <button onClick={() => setModalShow(el)} className="payer">
                      <i
                        className="fa fa-credit-card"
                        style={{ marginRight: 10 }}
                      ></i>
                      Payer
                    </button>
                  )}
                  {el.etat == 1 && (
                    <button
                      onClick={() => setLinkAlert(true)}
                      className="payer"
                    >
                      <i
                        style={{ marginRight: 10 }}
                        className="fa fa-video"
                      ></i>
                      Lien
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
        {ConsultFiltred.length == 0 && (
          <div className="empty_tab">
            <FiInfo />
            Pas de consultation
          </div>
        )}
      </>
    );
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {Loading ? "Paiement..."  : 'Paiement Avec'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          {!Loading ? (
          <>
            <img
              onClick={() => {
                PayerStripe(props);
              }}
              className="stripe_btn"
              src={Icon}
              alt=""
            />
          <hr />
            <img
                onClick={() => {
                  Paypal(props);
                }}
              className="stripe_btn"
              src={PaypalIcon}
              alt=""
            />
          </>
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
      
        </Modal.Body>
      </Modal>
    );
  }

  function LienModel() {
    return (
      <Modal
        show={LinkAlert}
        onHide={() => setLinkAlert(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>Lien introuvable</Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          Votre lien sera pret le jour de la consultation
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div className="home container inner-content" style={{ paddingTop: 50 }}>
      <>
        <LienModel />
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
      <div className="heading-bx mb-0">
        <h1 className="title-ext text-secondary">Mes Consultations</h1>
      </div>
      <div className="form-group form-wraper"></div>

      <Tabs
        onSelect={(k) => setFiltre(k)}
        defaultActiveKey="Tous"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab style={{ overflow: "auto" }} eventKey="Tous" title="Tous">
          <Tables />
        </Tab>
        <Tab
          style={{ overflow: "auto" }}
          eventKey="paiement"
          title="En paiement"
        >
          <Tables etat={0} />
        </Tab>
        <Tab style={{ overflow: "auto" }} eventKey="Payée" title="Payée">
          <Tables etat={1} />
        </Tab>
        <Tab style={{ overflow: "auto" }} eventKey="Terminée" title="Terminée">
          <Tables etat={2} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Consultations;
