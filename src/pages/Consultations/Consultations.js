/* eslint-disable */
import axios from 'axios';
import React, { useState ,useEffect} from 'react';
 
import { Tab, Table, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import url from '../../api';
import './Consultations.scss'
function Consultations() {
  const [Allconsult, setAllconsult] = useState([]);
  const [ConsultFiltred, setConsultFiltred] = useState([])
  const [Filtre, setFiltre] = useState(0)
  const UserReducer = useSelector((state) => state.UserReducer);

  const getConsults = async () =>{
    const res = await axios.get(`${url}/consultation/get`,{ params: { id: UserReducer._id } })
    setConsultFiltred(res.data)
    setAllconsult(res.data)
  }


  useEffect(() => {
    getConsults()
  }, []);


  useEffect(() => {
 
    if(Filtre == 'Tous')
    {
      setConsultFiltred(Allconsult)
    }
    if(Filtre == "attente")     
    {
    const arr = Allconsult.filter(el => el.etat == 0)
    setConsultFiltred(arr)
    }  
    if(Filtre == "Validée")    
    {
      const arr = Allconsult.filter(el => el.etat == 1)
      setConsultFiltred(arr)
    }  
    if(Filtre == "Terminée")     
   { 
    const arr = Allconsult.filter(el => el.etat == 2)
    setConsultFiltred(arr)
   }
  
  }, [Filtre])
  

  const Tables = () =>{
    return(
      <Table  style={{minWidth:1000}} striped bordered hover>
  <thead>
    <tr>
    <th><i className="fas fa-list-ol"></i></th>
      
      <th><i className="fas fa-user-md"></i> Spécialité</th>
      <th> <i className="far fa-calendar-alt"></i> Date</th>
      <th><i className="far fa-clock"></i> Heure</th>
      <th><i className="fas fa-ellipsis-h"></i> Etat</th>
    </tr>
  </thead>
  {
    ConsultFiltred.map((el,index)=>

  <tbody key={index}>
  <tr>
    <td>{index +1}</td>
    <td> {el.medecin} </td>
    <td> {el.date_consul} </td>
    <td> {el.heure_consul} </td>
  
    <td>
      {
        el.etat == 0 && <p className="m-0 etat_attente">
          <i className="fas fa-info-circle"></i>
          En attente</p> ||
        el.etat == 1 && <p className="m-0">Validée</p> ||
        el.etat == 2 && <p className="m-0">Terminée</p>
      }
    </td>

  </tr>
 
</tbody>
     )

    }
         
</Table>
    )
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const element = document.querySelector(".home");
    element.classList.remove("transition_opacity");
  }, []);

  return <div className="home container inner-content" style={{ paddingTop: 50 }}>
  <div className="heading-bx mb-0">
    <h5 className="title-ext text-secondary">Mes Consultations</h5>
  </div>
  <div className="form-group form-wraper">
   
  </div>
  
  <Tabs    onSelect={(k) => setFiltre(k)} defaultActiveKey="Tous" id="uncontrolled-tab-example" className="mb-3">
   
  <Tab style={{overflow:'auto'}}    eventKey="Tous" title="Tous">
      <Tables  />
    
   </Tab>
  <Tab style={{overflow:'auto'}}    eventKey="attente" title="En attente">
      <Tables etat={0} />
    
   </Tab>
  <Tab   style={{overflow:'auto'}} eventKey="Validée" title="Validée">
  <Tables etat={1} />
  </Tab>
  <Tab  style={{overflow:'auto'}} eventKey="Terminée" title="Terminée">
  <Tables etat={2} />
   </Tab>
  
</Tabs>

  
 
   
</div>
}

export default Consultations;
