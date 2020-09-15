import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/api/messages/now").then((response) => {
      setMessages(response.data);
    });
    const Name = prompt("Enter your name:");
    if (Name.length === 0) setName("user1");
    else setName(Name);
  }, []);

  useEffect(() => {
    var pusher = new Pusher("caeaea165257a4171eec", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <div className="app_body">
        {/* {Sidebar} */}
        <Sidebar />
        {/* Chatbar */}
        <Chat name={name} messages={messages} />
      </div>
    </div>
  );
}

export default App;
