import React, { useState } from "react";
import styled from "styled-components";
import ChatRoomList from "./ChatRoomList";

function Chat() {
  return (
    <ChatContainer>
      <ChatRoomList />
    </ChatContainer>
  );
}

export default Chat;

const ChatContainer = styled.div`
  padding: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatMsg = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Form = styled.form`
  position: fixed;
  width: 100%;
  height: 100px;
  display: flex;
  bottom: 0;
  background: #eee;
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
