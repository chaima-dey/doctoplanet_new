import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function ToCall() {
    const VideoGrid = useRef(null);
    const navigate = useNavigate()


    useEffect(() => {
        const myVideo = document.createElement('video')
        myVideo.muted = true
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        }).then(stream => {
            myVideo.srcObject = stream
            myVideo.addEventListener('loadedmetadata', () => {
              myVideo.play()
            })
            VideoGrid.current.append(myVideo) 
        })   
    }, [])
    
  return (
    <div>
        <button onClick={()=>   navigate("/call/roomid")}>JOIN</button>
        <div ref={VideoGrid}  id="video-grid"></div>
    
    </div>
  )
}

export default ToCall