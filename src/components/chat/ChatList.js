// blog_front

import React, { useEffect, useRef, useState } from "react";
import useInput from "../../hooks/useInput";
import styled from "styled-components";
import axios from "axios";

export const enterArray = ["enter", "numpadenter"];
const ChatList = (props) => {
  const [data, setData] = useState([]);
  const [isPw, setIsPw] = useState(false);
  const needPwStatus = useInput(false);
  const clickedRoomInfo = useInput("");
  const pwInput = useInput("");
  const [mount, setMount] = useState(false);
  const pwRef = useRef(null);

  // useEffect(() => {
  //   setMount(true);
  // }, []);
  //
  // useEffect(() => {
  //   if (mount) {
  //     getData();
  //   }
  // }, [mount]);

  const clickRoomAccess = (roomInfo) => {
    if (!roomInfo.pwStatus) {
      props?.setRoom(roomInfo);
    } else {
      needPwStatus.setValue(true);
      clickedRoomInfo.setValue(roomInfo);
    }
  };

  const enterAction = (e) => {
    if (enterArray.indexOf(e.key.toLowerCase()) > -1) {
      roomAccessAction();
    }
  };

  const roomAccessAction = async () => {
    if (!clickedRoomInfo.value) return alert("방 선택 오류입니다.");

    const accessData = await axios.post("/chat/rooms")({
      roomId: clickedRoomInfo.value.roomId,
      password: pwInput.value,
    });
    if (accessData === "fail") {
      return alert("비밀번호가 일치하지 않습니다.");
    } else {
      props?.setRoom(clickedRoomInfo.value);
    }
  };

  const getData = async () => {
    const result = await axios.post("/chat/rooms");
    if (!result) return null;
    setData(result.data);
  };

  const pwExit = () => {
    pwInput.setValue("");
    needPwStatus.setValue("");
    clickedRoomInfo.setValue("");
  };

  return (
    <ChatListContainer>
      <BoxFirst>
        <Title> Room List </Title>
      </BoxFirst>
      <Box
        style={{ padding: "0.5rem 0", height: "400px", position: "relative" }}
      >
        <Box style={{ overflow: "auto", height: "inherit" }}>
          {data?.map((r, index) => (
            <Box
              key={`chatlist-index${index}`}
              onClick={() => clickRoomAccess(r)}
              className="flex justify-between items-center"
              style={{
                border: "1px solid gray",
                borderRadius: "10px",
                margin: "1rem",
                padding: "1rem",
                "&:hover": {
                  backgroundColor: "#f2f2f2",
                  cursor: "pointer",
                },
              }}
            >
              <div>{r.roomName}</div>
              <div>{"만든이: " + r.makeUser}</div>
            </Box>
          ))}
        </Box>
        {needPwStatus.value && (
          <Box
            className="flex justify-center flex-col absolute h-full w-full"
            style={{ top: 0 }}
          >
            <Box
              className="flex justify-center self-center items-center flex-col relative"
              style={{
                padding: "0.5rem",
                borderRadius: "0.5rem",
              }}
            >
              <Box className="flex justify-end w-full">
                <Close
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => pwExit()}
                />
              </Box>
              <div style={{ marginBottom: "1rem" }}>
                입장하려면 비밀번호가 필요합니다
              </div>
              <Input
                {...pwInput}
                onKeyDown={enterAction}
                password={true}
                ref={pwRef}
              />
            </Box>
          </Box>
        )}
      </Box>
    </ChatListContainer>
  );
};

export default ChatList;

const ChatListContainer = styled.div``;

const BoxFirst = styled.div`
  border-radius: 10px 10px 0 0;
  text-align: center;
  display: flex;
  height: 60px;
`;

const Title = styled.h1``;

const Box = styled.div``;

const Close = styled.div``;
const Input = styled.div``;
