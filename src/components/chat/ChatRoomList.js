import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function ChatRoomList() {
  const [error, setError] = useState(null);
  const [roomList, setRoomList] = useState([]);
  const navigate = useNavigate();
  const goToChatRoom = (roomId) => {
    navigate(`/chat/rooms/${roomId}`); // Use template literals to create the path
  };

  useEffect(() => {
    fetchChatList();
  }, []);
  // 채팅방 목록 불러오기
  const fetchChatList = async () => {
    try {
      const response = await axios.get("/chat/rooms");
      setRoomList(response.data.data);
    } catch (error) {
      console.error("Error fetching chat list:", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ChatRoomListTitle>채팅방 리스트</ChatRoomListTitle>
      <ListTitle>
        {roomList.map((room) => (
          <li key={room.roomId} onClick={() => goToChatRoom(room.roomId)}>
            {room.roomTitle}
          </li>
        ))}
      </ListTitle>
    </div>
  );
}

export default ChatRoomList;

const ChatRoomListTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: ${(props) => props.theme.xl};
  font-weight: bold;
  padding-bottom: 20px;
`;
const ListTitle = styled.ul`
  width: 230px;
  font-size: ${(props) => props.theme.l};
  li {
    background-color: ghostwhite;
    padding: 10px;
    margin-bottom: 30px;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    }
  }
`;
