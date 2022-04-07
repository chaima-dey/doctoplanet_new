/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

import API from "../../api";
import "./Room.scss";
import { FiCameraOff, FiLogIn, FiPhoneOff, FiMicOff } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <video autoPlay ref={ref}></video>;
};

const Room = (props) => {
  const navigation = useNavigate()
  const params = useParams()
  const [peers, setPeers] = useState([]);
  const [Ready, setReady] = useState(false);
  const [MyStram, setMyStram] = useState(null)
  const [roomID, setroomID] = useState(null)
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  

  useEffect(() => {
    setroomID(params.roomID)
  }, [params])
  
 

  useEffect(() => {
    socketRef.current = io(API);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        setMyStram(stream)
    });
        if (!Ready) return;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, MyStram);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          console.log("user is joined to room");
          const peer = addPeer(payload.signal, payload.callerID, MyStram);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
    
    socketRef.current.on("user-leave", () => {
      console.log("user leaved");
      setPeers([]);
    });
  }, [Ready]);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
      console.log("sending")
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    
    });

    peer.signal(incomingSignal);

    return peer;
  }

  const Hangout = () => {
    setPeers([]);
    setReady(false);
    socketRef.current.emit("Hangout")
    navigation('/room/landing')
    setTimeout(() => {
      navigation('/room/d13b81d0-adfa-11ec-9e9c-fd920a407322')
    }, 500);
 
  };
  return (
    <div className="room_call">
      <div className="video-content">
        <div className="Video_1">
          <video muted ref={userVideo} autoPlay></video>
        </div>
        {peers.length > 0 &&
          peers.map((peer, index) => {
            return (
              <div key={index} className="Video_2">
                <Video key={index} peer={peer} />
              </div>
            );
          })}
          
      </div>
    {
         MyStram && <div className="controls">
          {Ready && (
            <button className="hangout-btn" onClick={() => Hangout()}>
              {" "}
              <FiPhoneOff />
            </button>
          )}
          {peers.length < 1 && !Ready && (
            <button className="participer" onClick={() => setReady(true)}>
              {" "}
              <FiLogIn />
            </button>
          )}
        </div>
    }
    </div>
  );
};

export default Room;
