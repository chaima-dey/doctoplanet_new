/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import "./Call.scss";
import Peer from "peerjs";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import API from "../../api"
import io from "socket.io-client";
const socket = io("http://localhost:5000/");
 
function Call() {

  const params = useParams();
  const [SendID, setSendID] = useState("");
  const [RoomID, setRoomID] = useState("c8130238-a03f-4990-b859-7023a9af18eb")
  const MyPeer = new Peer(undefined)
  const VideoGrid = useRef(null);
  const video_1 = useRef(null);
  const video_2 = useRef(null);
  const peers = {}
 
 

  useEffect(() => {

    MyPeer.on('open',id =>{    
      socket.emit("join-room",RoomID,id)
    })

  socket.on('user-disconnected', userId => {
    video_2.current.srcObject = null
  })

    
  video_1.current.muted = true
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {

      video_1.current.srcObject = stream
      video_1.current.addEventListener('loadedmetadata', () => {
      
      })

      MyPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          video_2.current.srcObject = userVideoStream
          video_2.current.addEventListener('loadedmetadata', () => {
            video_2.current.play()
          })
        })
      })  
      
      socket.on("user-joined",userID => {
        connectToNewUser(userID, stream)
      })
    })   


    return () => {  
      socket.removeAllListeners();
    }
  }, [VideoGrid])
  

 

  const connectToNewUser = (userID, stream) => {
    const call = MyPeer.call(userID, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      video_2.current.srcObject = userVideoStream
      video_2.current.addEventListener('loadedmetadata', () => {
        video_2.current.play()
      })
    })
    call.on('close', () => {
      video_2.current.remove()
    })
    peers[userID] = call
  }

   const addVideoStream = (video, stream) => {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    VideoGrid.current.append(video) 
  }
 

 
  return (
    <>
    <h3> {RoomID} </h3>
  <button onClick={() =>  video_1.current.play()}>PLAY 1</button>
    {/* <button onClick={}>Join</button> */}
    <div ref={VideoGrid}  id="video-grid">
      <video ref={video_1} src=""></video>
      <video ref={video_2} src=""></video>
    </div>
    </>
  );
}

export default Call;