import React, { useContext } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsCameraVideoFill } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
const Chat = () => {

  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <AiOutlineUserAdd size={24}/>
          <BsCameraVideoFill size={24}/>
          <FiMoreHorizontal size={24}/>
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
