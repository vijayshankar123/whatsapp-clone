import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

const SidebarChat = () => {
  return (
    <div className="SidebarChat">
      <Avatar />
      <div className="sidebarChat_info">
        <h3>Room Name !</h3>
        <p>This is the last message</p>
      </div>
    </div>
  );
};

export default SidebarChat;
