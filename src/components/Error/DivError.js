/* eslint-disable */
import React,{useState} from 'react'
import { Alert, CloseButton } from 'react-bootstrap'
import './Error.scss'
function DivError(props) {
  
    return (
        <Alert variant="danger"  >
      
        <p className='m-0'>
        <i className="fas fa-exclamation-circle"></i>
        {props.message}
        </p>
        <CloseButton style={{margin:0}} onClick={() => props.hideAlert()} />
      </Alert>
    )
}

export default DivError
