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
import { Button, Spinner } from "react-bootstrap";
import { FiCameraOff, FiCamera, FiMic, FiMicOff } from "react-icons/fi";
const socket = io(API);

function Call(props) {
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
  const [SendStream, setSendStream] = useState(null);
  const [UserId, setUserId] = useState(null)
  const [MyID, setMyID] = useState(null)
  const [LoadingUser, setLoadingUser] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {

    GetMyStrem()

    socket.on("user-leave", () => {
      video_2.current.srcObject = null;
      setUserIsHere(false);
    })

    socket.on("hangout", () => {
      window.location.reload();
    })

  }, []);




  const GetMyStrem = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        setMyStream(stream);
        
      });

      navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setSendStream(stream);
        connectToNewUser(UserId, stream)
      });
  }

  useEffect(() => {

    if (!Ready) return;
    MyPeer.on("open", (id) => {

      setMyID(id)

      socket.emit("join-room", params.roomID, id);
    });

    socket.on("user-disconnected", (userId) => {
      video_2.current.srcObject = null;
      setUserIsHere(false);

    });

    MyPeer.on("call", (call) => {
      call.answer(SendStream);
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
      connectToNewUser(userID, SendStream);
    });



  }, [Ready]);

  const connectToNewUser = (userID, stream) => {
    const call = MyPeer.call(userID, stream);

    call.on("stream", (userVideoStream) => {
      setLoadingUser(false)
      video_2.current.srcObject = userVideoStream;
      video_2.current.addEventListener("loadedmetadata", () => {
        video_2.current.play();
      });

    });

  };

  const Participer = () => {
    setReady(true)

  }





  // stop only camera
  const stopVideoOnly = () => {
    
  };

  useEffect(() => {

    video_1.current.srcObject = MyStream;
    video_1.current.addEventListener("loadedmetadata", () => {
      video_1.current.play();
      setTestVideo(true);
    });
    video_1.current.muted = true;


    const stream = video_1.current.srcObject;

    const tracks = stream?.getTracks();

  }, [MyStream]);

  const EndCall = () => {
    socket.emit("Leave-room")
  }

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
          {/* { LoadingUser &&  <div className="Spinner">
         <Spinner animation="border" variant="light" />
         </div> } */}
        </div>
      </div>

      <div className="controls">
        {TestVideo &&
          (!Ready ? (
            <Button
              onClick={() => Participer()}
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
              <Button variant="secondary">Middle</Button>
              <Button onClick={EndCall} variant="danger">End Call</Button>
            </>
          ))}
      </div>
    </div>
  );
}

export default Call;
