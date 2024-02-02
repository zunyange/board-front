import React from "react";
import styled from "styled-components";

function InputBox({
  messageValue,
  handleMessageChange,
  handleKeyPress,
  sendMessage,
}) {
  return (
    <div>
      <InputWrap>
        <input
          value={messageValue}
          onChange={handleMessageChange}
          onKeyPress={handleKeyPress}
        />
        <button type="button" onClick={() => sendMessage()}>
          Send
        </button>
      </InputWrap>
    </div>
  );
}

export default InputBox;

const InputWrap = styled.div`
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
