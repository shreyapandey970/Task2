import React from "react";
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";

const Chat = () => {
  const {data} = useContext(ChatContext);


  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={require('../img/video.png')} alt="Video" />
          <img src={require('../img/call.png')} alt="Call" />
          <img src={require('../img/dots.png')} alt="..." />
        </div>
        </div>
        <Messages />
        <Input /> 
    </div>
  );
};

export default Chat;