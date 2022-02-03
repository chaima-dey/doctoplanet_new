 import React from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
 import './_Alert.scss'
 function _Alert(props) {
   const dispatch = useDispatch()
  const CloseAlert = () =>{
    dispatch({
      type: "SetSuccess",
      payload: false,
    });
  }
   return <>
       { 
       props.close ?
        <Alert className="m-0" variant={props.variant} onClose={() => CloseAlert()}  dismissible>
           {/* <Alert.Heading>{props.title ? props.title : ""}</Alert.Heading> */}
           <p className='m-0'>
           <i className="fas fa-check-square"></i>
           {props.text ? props.text : ""}
           </p>
         </Alert>
         :
         <Alert className="m-0" variant={props.variant} onClose={() => CloseAlert()}  >
         {/* <Alert.Heading>{props.title ? props.title : ""}</Alert.Heading> */}
         <p className='m-0'>
         <i className="fas fa-check-square"></i>
         {props.text ? props.text : ""}
         </p>
       </Alert>
       }

   </>;
 }
 
 export default _Alert;
 