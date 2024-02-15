import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { WebsocketConnect } from "@/utils/WebsocketConnect";

function ChatBox({
  setSocket,
  messages,
  setMessages,
  fetchEnterRoom,
  enterChatRoom,
}) {
  const { id } = useParams();

  useEffect(() => {
    const connect = WebsocketConnect();
    setSocket(connect);
    connect?.connect({}, (frame) => {
      connect?.subscribe(`/sub/chat/room/${id}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        if (
          receivedMessage.messageType === "ENTER" ||
          receivedMessage.messageType === "TALK" ||
          receivedMessage.messageType === "OUT"
        ) {
          updateMessages([receivedMessage]);
        }
      });
      fetchEnterRoom();
      enterChatRoom(connect);
    });
    //채팅 내역 유지
    const updateMessages = (newMessages) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, ...newMessages];
        //로컬에 저장
        localStorage.setItem(
          `chatRoomHistory_${id}`,
          JSON.stringify(updatedMessages),
        );
        return updatedMessages;
      });
    };
    const storedMessages = localStorage.getItem(`chatRoomHistory_${id}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
    return () => {
      if (connect) {
        connect.disconnect();
      }
    };
  }, [id]);

  return (
    <ChatBoxContainer>
      {messages.map((msg, index) => (
        <div key={index}>
          <p>{msg.message}</p>
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
