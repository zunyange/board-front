import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Stomp from "stompjs";

import { WebsocketConnect } from "../../websocket/WebsocketConnect";

const type = {
  ENTER: "ENTER",
  TALK: "TALK",
  OUT: "OUT",
};

function ChatBox() {
  const [roomInfo, setRoomInfo] = useState({
    roomId: "",
    roomTitle: "",
  });
  const [messageInput, setMessageInput] = useState("");
  const [client, setClient] = useState();
  // const [userEmail, setUserEmail] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const { roomId } = useParams();
  const connectHandler = () => {
    const connect = WebsocketConnect();
    setClient(Stomp.over(connect));
  };

  useEffect(() => {
    // if (!roomInfo.value.roomId) return;
    connectHandler();
  }, [roomInfo.value?.roomId]);

  useEffect(() => {
    client?.connect({}, (frame) => {
      client?.subscribe(`/sub/chat/room/${roomId}`, (message) => {
        setCurrentMessage(JSON.parse(message.body));
        console.log("dd", JSON.parse(message.body));
      });
      const msg = {
        roomId: roomInfo.value?.roomId,
        sender: localStorage.getItem("userEmail"),
        message: messageInput.value,
      };

      client?.send(`/pub/chat/room${roomId}`, {}, JSON.stringify(msg));
    });
  }, [client]);

  return (
    <ChatBoxContainer>
      <div>dd</div>
      {currentMessage &&
        currentMessage.map((chat, index) => (
          <div key={chat.roomId}>
            <p>{chat.roomTitle}</p>
          </div>
        ))}
    </ChatBoxContainer>
  );
}
export default ChatBox;

const ChatBoxContainer = styled.div`
  background-color: ghostwhite;
  height: 100vh;
`;
