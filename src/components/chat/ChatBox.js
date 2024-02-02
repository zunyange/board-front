import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { WebsocketConnect } from "../../websocket/WebsocketConnect";

const type = {
  ENTER: "ENTER",
  TALK: "TALK",
  OUT: "OUT",
};

function ChatBox({ messages }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const { id } = useParams();

  // useEffect(() => {
  //   const connect = WebsocketConnect();
  //
  //   connect.connect({}, (frame) => {
  //     connect.subscribe(`/sub/chat/room/${id}`, (message) => {
  //       const messageData = JSON.parse(message.body);
  //       setMessages((prevMessages) => [...prevMessages, messageData]);
  //     });
  //   });
  //
  //   return () => connect.disconnect(); // Clean up on component unmount
  // }, []);

  return (
    <ChatBoxContainer>
      {messages.map((msg, index) => (
        <div key={index}>
          <p>{msg.message}</p>
        </div>
      ))}

      {/*{messages.map((msg, index) => (*/}
      {/*  <div key={index}>{msg.message}</div> // 메시지를 화면에 렌더링*/}
      {/*))}*/}
    </ChatBoxContainer>
  );
}
export default ChatBox;

const ChatBoxContainer = styled.div`
  background-color: ghostwhite;
  height: 100vh;
`;
