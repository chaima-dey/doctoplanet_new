/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function ToCall() {
  const video_1 = useRef()

  useEffect(() => {

  }, [])
  
const play = async () =>{
  const mediaStream = await navigator.mediaDevices.getUserMedia({video: false,audio:true});
  
  
  video_1.current.srcObject = mediaStream;
  video_1.current.play()
}


  return (
    <div>
    
     <button onClick={play}>PLAY</button>
      <div  id="video-grid">

      <video ref={video_1} className='video'  src="" > </video>
      </div>
     
    
    </div>
  )
}

export default ToCall