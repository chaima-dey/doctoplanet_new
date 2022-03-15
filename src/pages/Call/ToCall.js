/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function ToCall() {
  const VideoGrid = useRef(null);
  const navigate = useNavigate()
  const video_1 = useRef(null);
   let CameraExist = null
const dispatch = useDispatch()
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices()
    .then((devices)=> {     
     CameraExist =  devices.filter(el=> el.kind == "videoinput")
      console.log(CameraExist.length > 0)    
    })   
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    navigator.mediaDevices.getUserMedia({
      
      video: true,
      audio: true
    }).then(stream => {

      video_1.current.srcObject = stream
      video_1.current.addEventListener('loadedmetadata', () => {
      video_1.current.play()
      })
    })
  }, [])
 

  return (
    <div>
      <button onClick={() =>{
           dispatch({
            type: "SetReadyCall",
            payload: true,
          })
        navigate("/call/c8130238-a03f-4990-b859-7023a9af18eb", { replace: true })}}>JOIN</button>
     
      <div ref={VideoGrid} id="video-grid">
      <video  ref={video_1} src=""></video>
      </div>
    
    </div>
  )
}

export default ToCall