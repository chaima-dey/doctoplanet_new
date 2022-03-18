import React from 'react'
import Icon from "../../assets/images/icon/payments-stripe.png"
import './button.scss'
function Button() {
  return (
    <div>
        <img 
        // onClick={() =>  window.open("https://buy.stripe.com/test_eVa4iEbWL3dTdB6cMN","_blank")}
        className='stripe_btn' src={Icon} alt="" />
    </div>
  )
}

export default Button