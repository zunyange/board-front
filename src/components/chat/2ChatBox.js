// blog_front

import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import sockJs from "sockjs-client"; // 일관된 브라우저/클라이언트 플랫폼 인터페이스를 제공하는 WebSocket과 유사한 객체를 제공하는 JavaScript 라이브러리
import Stomp from "stompjs";

import useInput from "../../hooks/useInput";
import ChatList from "./ChatList";
import ChatMessage from "./ChatMessage";
import { loginSelector } from "../../recoil/login";

function ChatBox2() {
  const typeInput = useInput("ENTER");
  const messageInput = useInput("");
  const roomInfo = useInput(null);
  const userInfo = useRecoilValue(loginSelector);
  const [currentMessage, setCurrentMessage] = useState("");
  const [client, setClient] = useState();

  const connectHandler = () => {
    const socket = new sockJs("/chat/rooms", null, {
      transports: ["websocket", "xhr-streaming", "xhr-polling"],
    });
    setClient(Stomp.over(socket));
  };

  useEffect(() => {
    client?.connect({}, (frame) => {
      client?.subscribe("/chat/rooms", (message) => {
        setCurrentMessage(JSON.parse(message.body));
      });

      client?.send(
        `/pub/chat/${roomInfo.value.roomId}`,
        {},
        JSON.stringify({
          roomId: roomInfo.value?.roomId,
          roomName: roomInfo.value?.roomName,
          sender: userInfo?.name,
          type: typeInput.value,
          message: messageInput.value,
        }),
      );
    });
  }, [client]);

  useEffect(() => {
    if (!roomInfo.value.roomId) return;
    connectHandler();
    console.log("dd", roomInfo);
  }, [roomInfo.value?.roomId]);

  const postMessage = () => {
    if (
      messageInput.value.replace(/\s/g, "") === "" &&
      typeInput.value === "TALK"
    ) {
      alert("메시지를 입력 해 주세요.");
    }

    const msg = {
      roomId: roomInfo.value?.roomId,
      roomName: roomInfo.value?.roomName,
      sender: userInfo?.name,
      type: typeInput.value,
      message: messageInput.value,
    };

    if (client) {
      if (!client.connected) {
        client.connect({}, () => {
          // client?.get(`/chat/rooms/${roomId}`, {}, JSON.stringify(msg));
        });
      } else {
        client?.send(
          `/pub/chat/${roomInfo.value.roomId}`,
          {},
          JSON.stringify(msg),
        );
      }
    }
  };

  return (
    <Box
      className="bg-white"
      style={{
        width: "400px",
        height: "500px",
        marginBottom: "1.3rem",
        borderRadius: "10px",
      }}
    >
      {roomInfo.value !== "" ? (
        <ChatMessage
          roomInfo={roomInfo.value}
          postMessage={postMessage}
          setType={typeInput.setValue}
          currentMessage={currentMessage}
          {...messageInput}
        />
      ) : (
        <ChatList setRoom={roomInfo.setValue} />
      )}
    </Box>
  );
}

export default ChatBox2;

const Box = styled.div``;

const ChatBoxContainer = styled.div``;

const ChatBoxWrap = styled.div`
  // Add your styles here
`;

const ChatBoxTitle = styled.h1`
  // Add your styles here
`;

const ChatBoxList = styled.ul`
  // Add your styles here
`;

const ChatBoxItem = styled.li`
  // Add your styles here
`;

const ChatBoxItemImg = styled.img`
  // Add your styles here
`;

const ChatBoxItemContent = styled.div`
  // Add your styles here
`;

const ChatBoxItemContentName = styled.div`
  // Add your styles here
`;

const ChatBoxItemContentMsg = styled.div`
  // Add your styles here
`;
