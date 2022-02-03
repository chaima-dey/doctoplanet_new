import React from 'react'
import img_1 from '../../assets/images/appointment/women.png'
import img_2 from '../../assets/images/appointment/map-pin.png'
import img_3 from '../../assets/images/appointment/setting.png'
import img_4 from '../../assets/images/appointment/check.png'
import img_5 from '../../assets/images/appointment/chat.png'
import mobile from '../../assets/images/appointment/mobile.png'
import { useNavigate } from 'react-router-dom'
function RDV() {
  let navigate = useNavigate();

    return ( 
        <div className="container">
            <div className="appointment-inner py-5">
                <div className="container">
                    <div className="row align-items-center">
                    <div className="col-xl-5 col-lg-7 mb-30">	
					<div className="heading-bx">
						<h6 className="title-ext text-secondary">Prendre un rendez-vous ?</h6>
					 
						<h6><li>consultez depuis n’importe où dans le monde</li></h6>
						<h6><li>votre demande est confirmée en 48h</li></h6>
					</div>
					<button
                    onClick={() => navigate('/rendez_vous')} className="btn btn-secondary btn-lg shadow">Prendre un rendez-vous</button>
				</div>
                        <div className="col-xl-7 col-lg-6 col-md-6">
                            <div className="appointment-thumb" >
                                <img src={mobile} alt=""/>
                                <div className="images-group">
                                    <img className="img1" src={img_1} alt=""/>
                                    <img className="img2" src={img_2}alt=""/>
                                    <img className="img3" src={img_3} alt=""/>
                                    <img className="img4" src={img_4} alt=""/>
                                    <img className="img5" src={img_5} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>					
                </div>	
                
            </div>					
        </div>
 
    )
}

export default RDV
