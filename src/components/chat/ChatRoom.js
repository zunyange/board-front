import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import ChatBox from "@/components/chat/ChatBox";
import InputBox from "@/components/chat/InputBox";

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
  const enterChatRoom = (connect) => {
    const enterMsg = {
      messageType: "ENTER",
      roomId: id,
      sender: localStorage.getItem("userEmail"),
    };
    if (connect) {
      connect.send(`/pub/chat/message`, {}, JSON.stringify(enterMsg));
    }
    // setMessages((prevMessages) => [...prevMessages, enterMsg]);
    // 메시지 서버에 보내기 : 이 부분은 서버에서 보내주기 때문에 안해도됨
    // socket?.send(`/pub/chat/message`, {}, JSON.stringify(enterMsg));
  };

  const sendMessage = () => {
    const userEmail = localStorage.getItem("userEmail");
    const user = userEmail.split("@")[0];
    const talkMsg = {
      messageType: "TALK",
      roomId: id,
      sender: localStorage.getItem("userEmail"),
      message: `${user}: ${messageValue}`,
    };

    if (socket && messageValue.trim()) {
      socket?.send(`/pub/chat/message`, {}, JSON.stringify(talkMsg));
      // 보낸 메세지 띄우기 = 2번 보임
      // setMessages((prevMessages) => [...prevMessages, talkMsg]);
      setMessageValue("");
    }
  };

  const outChatRoom = () => {
    const outMsg = {
      messageType: "OUT",
      roomId: id,
      sender: localStorage.getItem("userEmail"),
    };
    if (socket) {
      socket?.send(`/pub/chat/message`, {}, JSON.stringify(outMsg));
    }
    localStorage.removeItem(`chatRoomHistory_${id}`);
    sessionStorage.removeItem(`firstEntry_${id}`);
    goToList();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // const fetchEnterRoom = async () => {
  //   try {
  //     const response = await axios.get(`/chat/rooms/${id}`);
  //     console.log("입장한 채팅방: ", response);
  //     setRoomInfo(response.data.data);
  //   } catch (error) {
  //     console.error("채팅방 입장 에러:", error);
  //   }
  // };


  return (
    <div>
      <GoToRoomList>
        <h1 onClick={goToList}>채팅방 목록으로 돌아가기</h1>
      </GoToRoomList>
      <RoomTitle>채팅방 이름 : {roomInfo?.roomTitle}</RoomTitle>
      <ChatOut>
        <h3 onClick={outChatRoom}>채팅방에서 나가기</h3>
      </ChatOut>
      <ChatBox
        setSocket={setSocket}
        messages={messages}
        setMessages={setMessages}
        fetchEnterRoom={fetchEnterRoom}
        enterChatRoom={enterChatRoom}
      />
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
  padding: 3% 0% 2% 0%;
  display: flex;
  //flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.xl};
  font-weight: bold;
  h1 {
    cursor: pointer;
    &:hover {
      font-weight: bold;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    }
  }
`;

const RoomTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatOut = styled.div`
  display: flex;
  justify-content: right;
  padding: 20px;
  h3 {
    cursor: pointer;
    &:hover {
      font-weight: bold;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    }
  }
`;
