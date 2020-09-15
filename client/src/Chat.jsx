import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import AttachFile from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import axios from "axios";
import ScrollToEnd from "react-scroll-to-bottom";

import MicIcon from "@material-ui/icons/Mic";

const Chat = ({ messages, name }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    myFunction();
    console.log("aa");
  }, []);
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    myFunction();

    const formData = {
      name,
      message,
      received: false,
      timestamp: "none",
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post("/api/messages/now", formData, config);
    setMessage("");
  };
  function myFunction() {
    var elmnt = document.getElementById("scrollhere");

    elmnt.scrollIntoView({
      behavior: "smooth",
    });
  }
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chat_headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages &&
          messages.map((message, index) =>
            message.name === "user1" ? (
              <p key={index} className="chat_text chat_receiver ">
                <span className="chat_name">{message.name}</span>
                {message.message}
                <span className="chat_timestamp">
                  {new Date().toUTCString()}
                </span>
              </p>
            ) : (
              <p key={index} className="chat_text">
                <span className="chat_name">{message.name}</span>
                {message.message}
                <span className="chat_timestamp">
                  {new Date().toUTCString()}
                </span>
              </p>
            )
          )}
        <div id="scrollhere"></div>
      </div>

      <div className="chat_footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>

        <div className="chat_footerInput">
          <form onSubmit={onSubmit} autoComplete="off">
            <input
              onChange={onChange}
              name="message"
              value={message}
              type="text"
              placeholder="Type a message"
            />
          </form>
        </div>

        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
