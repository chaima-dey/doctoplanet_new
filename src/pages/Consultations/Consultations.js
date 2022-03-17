/* eslint-disable */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Button, Modal, Tab, Table, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import url from '../../api';
import './Consultations.scss'
function Consultations() {
  const [Allconsult, setAllconsult] = useState([]);
  const [ConsultFiltred, setConsultFiltred] = useState([])
  const [Filtre, setFiltre] = useState(0)
  const UserReducer = useSelector((state) => state.UserReducer);
  const [modalShow, setModalShow] = useState(false);
  const getConsults = async () => {
    const res = await axios.get(`${url}/consultation/get`, { params: { id: UserReducer._id } })
    setConsultFiltred(res.data)
    setAllconsult(res.data)
  }


  useEffect(() => {
    getConsults()
  }, []);


  useEffect(() => {

    if (Filtre == 'Tous') {
      setConsultFiltred(Allconsult)
    }
    if (Filtre == "paiement") {
      const arr = Allconsult.filter(el => el.etat == 0)
      setConsultFiltred(arr)
    }
    if (Filtre == "Payée") {
      const arr = Allconsult.filter(el => el.etat == 1)
      setConsultFiltred(arr)
    }
    if (Filtre == "Terminée") {
      const arr = Allconsult.filter(el => el.etat == 2)
      setConsultFiltred(arr)
    }

  }, [Filtre])


  const Tables = () => {
    return (
      <Table style={{ minWidth: 1000 }} striped bordered hover>
        <thead>
          <tr>
            <th><i className="fas fa-list-ol"></i></th>

            <th><i className="fas fa-user-md"></i> Spécialité</th>
            <th> <i className="far fa-calendar-alt"></i> Date</th>
            <th><i className="far fa-clock"></i> Heure</th>

            <th><i className="fas fa-ellipsis-h"></i> Etat</th>

            <th style={{ width: 200 }}> Actions</th>
          </tr>
        </thead>
        {
          ConsultFiltred.map((el, index) =>

            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td> {el.medecin} </td>
                <td> {DateFormat(el.date_consul)} </td>
                <td> {el.heure_consul} </td>


                <td>
                  {
                    el.etat == 0 && <p className="m-0 etat_attente">
                      <i className="fas fa-info-circle"></i>
                      En Paiement</p> ||
                    el.etat == 1 && <p className="m-0 payee_etat"><i className="fas fa-check-circle"></i> Payée</p> ||
                    el.etat == 2 && <p className="m-0">Terminée</p>
                  }
                </td>
                <td className='action_consult'>
                {  el.etat == 0 && <button onClick={() => setModalShow(el)} className='payer'>
                <i className="fa fa-credit-card" style={{marginRight:10}}></i>
                  Payer</button>}
                {  el.etat == 1 && <button   className='payer'>
                <i  style={{marginRight:10}} className="fa fa-video"></i>
                  Lien</button>}
                </td>

              </tr>

            </tbody>
          )

        }

      </Table>
    )
  }

  const DateFormat = (date) => {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, "0");
    const day = dt.getDate().toString().padStart(2, "0");
    return day + '/' + month + '/' + year
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
            Paiement Avec
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button onClick={() => { PayerStripe(props) }}>Stripe</button>
        </Modal.Body>

      </Modal>
    );
  }

  useEffect(() => {



    window.scrollTo(0, 0);
    const element = document.querySelector(".home");

  }, []);


  const PayerStripe = async (props) => {

    if (props.show.stripe_link?.length > 10) {
      window.open(props.show.stripe_link, '_blank');
      setModalShow(null)
      getConsults()
    }
    else {

      try {
        const res = await axios.post(`http://localhost:5000/stripe/add_product`, props.show);
        getConsults()
        window.open(res.data.url, '_blank');

      } catch (error) {
        console.log("error")
      }
    }

  }

  return <div className="home container inner-content" style={{ paddingTop: 50 }}>
    <>


      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
    <div className="heading-bx mb-0">
      <h1 className="title-ext text-secondary">Mes Consultations</h1>
    </div>
    <div className="form-group form-wraper">

    </div>

    <Tabs onSelect={(k) => setFiltre(k)} defaultActiveKey="Tous" id="uncontrolled-tab-example" className="mb-3">

      <Tab style={{ overflow: 'auto' }} eventKey="Tous" title="Tous">
        <Tables />

      </Tab>
      <Tab style={{ overflow: 'auto' }} eventKey="paiement" title="En paiement">
        <Tables etat={0} />

      </Tab>
      <Tab style={{ overflow: 'auto' }} eventKey="Payée" title="Payée">
        <Tables etat={1} />
      </Tab>
      <Tab style={{ overflow: 'auto' }} eventKey="Terminée" title="Terminée">
        <Tables etat={2} />
      </Tab>

    </Tabs>




  </div>
}

export default Consultations;
