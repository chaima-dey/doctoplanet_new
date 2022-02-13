/* eslint-disable */
import React from "react";
import "./Cards.scss";
import RDVicon from "../../assets/images/icon/rendez-vous.png";
import Paiementicon from "../../assets/images/icon/mode-de-paiement (1).png";
import Consulticon from "../../assets/images/icon/consultant.png";
import { Col, Container, Row } from "react-bootstrap";

function Cards() {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          {" "}
          <div className="card_steps">
            <div className="step__1">
                <div className="border_">
               
                </div>
                
              <img src={RDVicon} alt="" />
            </div>
            <div className="step__2"></div>
            <div className="step__3">01</div>
          </div>
          <h3>Demande RDV</h3>
          <p>Le patient fait sa demande de RDV en ligne</p>
        </Col>
        <Col>
          {" "}
          <div className="card_steps">
            <div className="step__1">
                <div className="border_">
               
                </div>
                
              <img src={Paiementicon} alt="" />
            </div>
            <div className="step__2"></div>
            <div className="step__3">02</div>
          </div>
        </Col>
        <Col>
          {" "}
          <div className="card_steps">
            <div className="step__1">
                <div className="border_">
               
                </div>
                

              <img src={Consulticon} alt="" />
            </div>
            <div className="step__2"></div>
            <div className="step__3">03</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Cards;
