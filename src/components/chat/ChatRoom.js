import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { WebsocketConnect } from "../../websocket/WebsocketConnect";
import ChatBox from "./ChatBox";
import InputBox from "./InputBox";

function ChatRoom(userEmail) {
  const [socket, setSocket] = useState(null);
  const [roomInfo, setRoomInfo] = useState(null);
  const [messageValue, setMessageValue] = useState("");
  const [messages, setMessages] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const handleMessageChange = (e) => {
    setMessageValue(e.target.value);
  };
  const goToList = () => {
    navigate("/chat/rooms");
  };
  const enterChatRoom = (socket) => {
    // if (!messageValue.trim()) return;

    // send버튼 에러:Check if the socket is connected before sending a message
    // if (!socket || typeof socket.send !== "function") {
    //   console.error("WebSocket connection not established");
    //   return;
    // }

    const enterMsg = {
      messageType: "ENTER",
      roomId: id,
      sender: localStorage.getItem("userEmail"),

      // message: `${user}: ${messageValue}`,
    };
    console.log("EnterMsg★★★★★★★: ", enterMsg);
    // Add the message to the local state
    setMessages((prevMessages) => [...prevMessages, enterMsg]);
    // Send the message to the server
    socket?.send(`/pub/chat/message`, {}, JSON.stringify(enterMsg));
    setMessageValue("");
  };

  const sendMessage = () => {
    const userEmail = localStorage.getItem("userEmail");
    // const user = typeof userEmail === "string" ? userEmail.split("@")[0] : "";
    const user = userEmail.split("@")[0];
    const msg = {
      messageType: "TALK",
      roomId: id,
      sender: localStorage.getItem("userEmail"),
      message: `${user}: ${messageValue}`,
    };

    if (socket && messageValue.trim()) {
      socket?.send(`/pub/chat/message`, {}, JSON.stringify(msg));
      setMessageValue(""); // Clear the input after sending
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const fetchEnterRoom = async () => {
    try {
      const response = await axios.get(`/chat/rooms/${id}`);
      console.log("입장한 채팅방: ", response);
      setRoomInfo(response.data.data);
    } catch (error) {
      console.error("Error fetching chat list:", error);
    }
  };

  useEffect(() => {
    const connect = WebsocketConnect();
    setSocket(connect);
    connect?.connect({}, (frame) => {
      connect?.subscribe(`/sub/chat/room/${id}`, (message) => {
        // console.log("msg: " + message);
        const receivedMessage = JSON.parse(message.body);
        // messageType이 'ENTER'인 경우에만 메시지를 배열에 추가
        if (receivedMessage.messageType === "ENTER") {
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
      });
      fetchEnterRoom();
      enterChatRoom(connect);
    });
    // return () => {
    //   connect.disconnect();
    // };
  }, [id]);

  return (
    <div>
      <GoToRoomList onClick={goToList}>채팅방 목록으로 돌아가기</GoToRoomList>
      <RoomTitle>채팅방 이름 : {roomInfo?.roomTitle}</RoomTitle>
      {/*{rooms.map((room) => {*/}
      {/*  return (*/}
      {/*    <div key={room.roomId}>*/}
      {/*      <h3>{room.roomTitle}</h3>*/}
      {/*    </div>*/}
      {/*  );*/}
      {/*})}*/}
      <ChatBox messages={messages} />
      <InputBox
        messageValue={messageValue}
        handleMessageChange={handleMessageChange}
        handleKeyPress={handleKeyPress}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default ChatRoom;

const GoToRoomList = styled.div`
  padding: 3% 0%;
  display: flex;
  //flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.xl};
  font-weight: bold;
  cursor: pointer;
`;

const RoomTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
