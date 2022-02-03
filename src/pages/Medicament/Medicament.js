/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";
import med_icon from "../../assets/images/icon/med_icon.svg";
import "./Med.scss";
import background from "../../assets/images/main-banner/bg1.jpg";
import MED from "../../assets/images/banner/medicament.png";
import axios from "axios";
import url from "../../api";
import Select from 'react-select'
function Medicament() {
  const [NomMed, setNomMed] = useState("");
  const [Labo, setLabo] = useState([]);
  const [MedList, setMedList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [SelectMed, setSelectMed] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const element = document.querySelector(".home");
    element.classList.remove("transition_opacity");
  }, []);

 
  useEffect(() => {
    GetLabos()
  }, []);

  const list = (myArray) => {
    const keys = myArray[0].components;

    const all_key = Object.keys(keys);
    return all_key.map((el) => (
      <Badge
        key={el}
        className="mt-2"
        style={{ fontSize: 12, fontWeight: "200", marginRight: 5 }}
        pill
        bg="primary"
      >
        {el}
      </Badge>
    ));
  };
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>{SelectMed.title}</h6>
          <p>
            <b>Type : </b>{" "}
            {SelectMed.composition ? SelectMed.composition[0].type : ""}
            <br />
            <b>Quantité : </b>{" "}
            {SelectMed.composition ? SelectMed.composition[0].quantity : ""}
            <br />
            <b>Consposition : </b>{" "}
            {SelectMed.composition ? list(SelectMed.composition) : ""}
            {}
          </p>
        </Modal.Body>

        <Modal.Footer style={{ justifyContent: "space-between" }}>
          {SelectMed.authorization_holder && (
            <Badge pill bg="secondary">
              {SelectMed.authorization_holder}
            </Badge>
          )}
        
        </Modal.Footer>
      </Modal>
    );
  }

  const search = async (text) => {
    setNomMed(text);

    const res = await axios.post(`${url}/medicament`, {
      text: NomMed,
      pagination: 10,
    });
    setMedList(res.data);
  };
  const EnterSearch = async () => {
    if (NomMed.length == 0 || NomMed == " ") return;
    const res = await axios.post(`${url}/medicament`, {
      text: NomMed,
      pagination: 10,
    });
    setMedList(res.data);
  };

  const ShowModal = (id) => {
    const med = MedList.find((el) => el.id == id);

    setSelectMed(med);
    setModalShow(true);
  };
  const GetLabos = async (e) =>{
 
    const res = await axios.post(`${url}/laboratoire`, {
      pagination: 20,
    });
    const arr = []
    res.data.map(el =>
   {
  
  
    arr.push( { value: el.authorization_holder, label: el.authorization_holder })
    setLabo(arr)
   }
      )
  }
  return (
    <>
      <div
        className="home main-banner offre_banner"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="container inner-content">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-7 text-center">
              <h1 className="title-ext text-primary">Guide Médicament</h1>
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
      </div>
      <>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
      <div className="container inner-content" style={{ paddingTop: 50 }}>
        <div className="heading-bx mb-0">
          <h5 className="title-ext text-secondary">Chercher un médicament</h5>
        </div>
        <div className="form-group form-wraper">
          <input
            valur={NomMed}
            onChange={(e) => search(e.target.value)}
            type="text"
            className="form-control medicament_input"
            placeholder="Nom du médicament"
          />
        </div>
        <hr />
        <Select placeholder='Nom du laboratoire'  options={Labo} />
        {/* <Form.Select aria-label="Default select mt-2">
          <option>Laboratoire</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select> */}
        <hr />
        {/* <Form.Select aria-label="Default select mt-2">
          <option>Classe</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        <hr /> */}
        <Button
          onClick={EnterSearch}
          style={{ float: "right" }}
          variant="primary"
          size="sm"
        >
          Search
        </Button>{" "}
        <br />
        <br />
        <hr />
        <div className="med_list">
          {MedList.length > 0 &&
            MedList.map((el, index) => (
              <Card key={index}>
                <Card.Header as="h5">
                  <img src={med_icon} />
                  {el.title}
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <b>Type : </b> {el.composition[0].type}
                  </Card.Text>
                  <Button onClick={() => ShowModal(el.id)} variant="primary">
                    Voir fiche
                  </Button>
                  <br />
                  <Badge className="mt-2" pill bg="primary"></Badge>{" "}
                  {el.authorization_holder && (
                    <Badge pill bg="secondary">
                      {el.authorization_holder}
                    </Badge>
                  )}
                </Card.Body>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}

export default Medicament;
