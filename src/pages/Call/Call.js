/* eslint-disable */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./Call.scss";
import Peer from "peerjs";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import API from "../../api";

import { Button, Spinner } from "react-bootstrap";
import { FiCameraOff, FiLogIn, FiPhoneOff, FiMicOff } from "react-icons/fi";
import io from "socket.io-client";
const socket = io(API);

function Call(props) {
  const ReadyCall = useSelector((state) => state.ReadyCall);
  const location = useLocation();
  const params = useParams();
  const [Ready, setReady] = useState(false);
  const [UserIsHere, setUserIsHere] = useState(null);
  const [TestVideo, setTestVideo] = useState(false);

  const VideoGrid = useRef(null);
  const video_1 = useRef(null);
  const video_2 = useRef(null);
  const [MyStream, setMyStream] = useState(null);
  const [UserId, setUserId] = useState(null);
  const [MyID, setMyID] = useState(null);
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(null);
  const [VideoScale, setVideoScale] = useState(null);
  const { v4: uuidv4 } = require('uuid');
  const MyPeer = new Peer(uuidv4());
  useEffect(() => {
    GetMyStrem();
    socket.on("user-leave", () => {
      video_2.current.srcObject = null;
      setUserIsHere(false);
    });

    socket.on("hangout", () => {
      window.location.reload();
    });
  }, []);

  const GetMyStrem = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setMyStream(stream);
        // connectToNewUser(UserId, stream);
      });
  };

  useEffect(() => {
    if (!Ready) return;

    console.log(MyPeer);
  try {
    MyPeer.on("open", (id) => {
      setMyID(id);
      console.log("you joined : "+id);
      socket.emit("join-room", params.roomID, id);
    });
  } catch (error) {
    console.log(error)
  }

    socket.on("user-disconnected", (userId) => {
      video_2.current.srcObject = null;
      setUserIsHere(false);
    });

    MyPeer.on("call", (call) => {   
       call.answer(MyStream);
       call.on("stream", (userVideoStream) => {
        console.log('get stream')
         setUserIsHere(true);
         video_2.current.srcObject = userVideoStream;
         video_2.current.addEventListener("loadedmetadata", () => {
           video_2.current.play();
         });
       });
     });

    socket.on("user-joined", (userID) => {
      console.log("user joined : "+userID);
 
      setUserId(userID);
      setUserIsHere(userID);
      connectToNewUser(userID, MyStream);
    });
  }, [Ready]);

  const connectToNewUser = (userID, stream) => {
    const call = MyPeer.call(userID, stream);
    call.on("stream", (userVideoStream) => {    
      video_2.current.srcObject = userVideoStream;
      video_2.current.addEventListener("loadedmetadata", () => {
        video_2.current.play();
      });
    });
  };

  
  useEffect(() => {
    video_1.current.srcObject = MyStream;
    video_1.current.addEventListener("loadedmetadata", () => {
      video_1.current.play();
      setTestVideo(true);
    });
    video_1.current.muted = true;
  }, [MyStream]);

  const Participer = () => {
    setReady(true);
  };

 


  const EndCall = () => {
    // socket.emit("Leave-room");
    window.location.reload();
  };

  const ScaleVideo = (videoRef) => {
    const Video_1 = document.querySelector(".video_1");
    const Video_2 = document.querySelector(".video_2");
    const size_1 = Video_1.offsetWidth;
    const size_2 = Video_2.offsetWidth;
    Video_1.style.width = `${size_2}px`;
    Video_2.style.width = `${size_1}px`;
  };

  return (
    <div className="room">
      {
        <div ref={VideoGrid} id="video-grid">
          <div className={"video_1 " + (!UserIsHere && "UserIsHere")}>
            <video
              onClick={() => ScaleVideo("video_1")}
              ref={video_1}
              src={MyStream}
            ></video>
          </div>
          <div
            className="video_2"
            style={{ display: UserIsHere ? "" : "none" }}
          >
            <video
              onClick={() => ScaleVideo("video_2")}
              ref={video_2}
              src=""
            ></video>
          </div>
        </div>
      }

      <div className="controls">
        {TestVideo &&
          (!Ready ? (
            <div>
              {
                <Button
                  onClick={() => Participer()}
                  variant="primary"
                  className="participer"
                  size="lg"
                >
                  <FiLogIn />
                </Button>
              }
            </div>
          ) : (
            <>
              {/* <Button onClick={stopVideoOnly} variant="secondary">
                <FiCameraOff />
              </Button> */}
              {MyID && (
                <button
                  className="hangout-btn"
                  onClick={EndCall}
                  variant="danger"
                >
                  <FiPhoneOff />
                </button>
              )}

              {!MyID && (
                <div className="loading">
                  <Spinner animation="border" variant="light" />
                </div>
              )}
            </>
          ))}
      </div>
    </div>
  );
}

export default Call;
