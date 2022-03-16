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
import io from "socket.io-client";
import { Button } from "react-bootstrap";
import { FiCameraOff, FiCamera, FiMic, FiMicOff } from "react-icons/fi";
const socket = io(API);

function Call() {
  const ReadyCall = useSelector((state) => state.ReadyCall);
  const location = useLocation();
  const params = useParams();
  const [Ready, setReady] = useState(false);
  const [UserIsHere, setUserIsHere] = useState(null);
  const [TestVideo, setTestVideo] = useState(false);
  const [RoomID, setRoomID] = useState("c8130238-a03f-4990-b859-7023a9af18eb");
  const MyPeer = new Peer(undefined);
  const VideoGrid = useRef(null);
  const video_1 = useRef(null);
  const video_2 = useRef(null);
  const [MyStream, setMyStream] = useState(null);
 const [UserId, setUserId] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    GetMyStrem()
  }, []);


  const GetMyStrem = () =>{
    navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      setMyStream(stream);
      connectToNewUser(UserId,stream)
    });
  }

  useEffect(() => {
    if (!Ready) return;
    MyPeer.on("open", (id) => {
      socket.emit("join-room", params.roomID, id);
    });

    socket.on("user-disconnected", (userId) => {
      video_2.current.srcObject = null;
      setUserIsHere(false);
    });

    MyPeer.on("call", (call) => {
      call.answer(MyStream);
      call.on("stream", (userVideoStream) => {
        setUserIsHere(true);
        video_2.current.srcObject = userVideoStream;
        video_2.current.addEventListener("loadedmetadata", () => {
          video_2.current.play();
        });
      });
    });

    socket.on("user-joined", (userID) => {
      setUserId(userID)
      setUserIsHere(userID);
      connectToNewUser(userID, MyStream);
    });

    return () => {
      socket.removeAllListeners();
    };
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

 

  // stop only camera
  const stopVideoOnly = () => {
    const video = MyStream.getTracks();
    video[1].stop();
    const call = MyPeer.call(UserId, MyStream);
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

  return (
    <div>
      <p>Room id : {RoomID}</p>

      {/* <button onClick={}>Join</button> */}
      <div ref={VideoGrid} id="video-grid">
        <div className="video_1">
          <video ref={video_1} src={MyStream}></video>
        </div>
        <div className="video_2" style={{ display: UserIsHere ? "" : "none" }}>
          <video ref={video_2} src=""></video>
        </div>
      </div>

      <div className="controls">
        {TestVideo &&
          (!Ready ? (
            <Button
              onClick={() => setReady(true)}
              variant="primary"
              className="participer"
              size="lg"
            >
              Participer
            </Button>
          ) : (
            <>
              <Button onClick={stopVideoOnly} variant="secondary">
                <FiCameraOff />
              </Button>
              <Button onClick={  GetMyStrem} variant="secondary">Middle</Button>
              <Button variant="secondary">Right</Button>
            </>
          ))}
      </div>
    </div>
  );
}

export default Call;
