import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { WebsocketConnect } from "../../websocket/WebsocketConnect";
import ChatBox from "./ChatBox";

function ChatRoom() {
  const [socket, setSocket] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [roomInfo, setRoomInfo] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const handleMessageChange = (e) => {
    setMessageInput(e.target.value);
  };
  const goToList = () => {
    navigate("/chat/rooms");
  };
  const pubMessage = (socket) => {
    const msg = {
      // roomId: roomIdInfo.value?.roomId,
      messageType: "ENTER",
      roomId: id,
      sender: localStorage.getItem("userEmail"),
      message: "abc",
    };
    // if (socket.isConnected) {
    socket.send(`/pub/chat/message`, {}, JSON.stringify(msg));
    //
  };
  useEffect(() => {
    axios
      .get(`/chat/rooms/${id}`)
      .then((res) => {
        console.log("입장한 채팅방", res.data.data);
        setRoomInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const connect = WebsocketConnect();
    setSocket(connect);
    console.log(`/sub/message/${id}`);
    connect?.connect({}, (frame) => {
      connect?.subscribe(`/sub/chat/room/${id}`, (message) => {
        console.log("msg: " + message);
      });
      pubMessage(connect);
    });
    // return () => {
    //   connect.disconnect();
    // };
  }, []);

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
      <ChatBox />
      <Form id="chat-form">
        <input value={messageInput} onChange={handleMessageChange} />
        <button type="button" onClick={() => pubMessage()}>
          Send
        </button>
      </Form>
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

const Form = styled.div`
  position: fixed;
  width: 100%;
  height: 100px;
  display: flex;
  bottom: 0;
  background: ghostwhite;
  input {
    width: 85%;
    margin: 0.5%;
    border-radius: 5px;
    border: none;
    padding: 10px;
  }
  button {
    width: 12%;
    margin: 0.5%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background: ${(props) => props.theme.lightColor};
    cursor: pointer;
  }
`;
