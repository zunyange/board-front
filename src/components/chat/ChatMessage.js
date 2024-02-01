// blog_front

import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginSelector } from "../../recoil/login";
import useInput from "../../hooks/useInput";
import styled from "styled-components";

const ChatMessage = (props) => {
  const [messageArray, setMessageArray] = useState([]);
  const [mount, setMount] = useState(false);
  const userInfo = useRecoilValue(loginSelector);
  const inputProps = useInput(props.value);
  const scrollRef = useRef(null);

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    if (props.currentMessage) {
      setMessageArray([...messageArray, props.currentMessage]);

      scrollToBottom();
    }
  }, [props.currentMessage]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scroll({
          top: scrollRef.current.scrollHeight - scrollRef.current.clientHeight,
          behavior: "smooth",
        });
      }, 500);
    }
  };

  useEffect(() => {
    if (mount) {
      props.postMessage();
      props.setType("TALK");
    }
  }, [mount]);

  const postMessageEvent = (e) => {
    if (e.key == "Enter") {
      props.postMessage();
      props.setValue("");
    }
  };

  if (!mount) return null;
  return (
    <>
      <Box
        style={{
          borderRadius: "10px 10px 0 0",
          textAlign: "center",
          display: "flex",
          height: "50px",
        }}
      >
        <Text size="1.3rem" style={{ margin: "0 0.5rem" }}>
          {props?.roomInfo?.roomName}
        </Text>
      </Box>
      <Box
        style={{
          padding: "1rem 1rem",
          height: "360px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          ref={scrollRef}
          style={{
            overflow: "auto",
            padding: "1rem 0",
            boxSizing: "border-box",
            height: "inherit",
          }}
        >
          {/*userInfo?.name == r.sender가 true인 경우 렌더링*/}
          {messageArray != null &&
            messageArray?.map((r, index) => {
              if (r.type == "ENTER") {
                return (
                  <Box
                    key={`user-message-index${index}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "0.5rem",
                      paddingBottom: "0.5rem",
                    }}
                  >
                    <Text color="black">안내: {r.message}</Text>
                  </Box>
                );
              } else {
                return (
                  <Box
                    key={`user-message-index${index}`}
                    style={{
                      display: "flex",
                      justifyContent:
                        userInfo?.name == r.sender ? "end" : "start",
                    }}
                  >
                    {/*<Box*/}
                    {/*  style={{*/}
                    {/*    display: "flex",*/}
                    {/*    flexDirection: "column",*/}
                    {/*    alignItems: "center",*/}
                    {/*    marginBottom: "0.5rem",*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  <Text color="black">{r.sender}: </Text>*/}
                    {/*  <Box*/}
                    {/*    style={{*/}
                    {/*      borderRadius: "10px",*/}

                    {/*      padding: "0.2rem 1rem",*/}
                    {/*      marginLeft: "0.7rem",*/}
                    {/*      justifyContent: "end",*/}
                    {/*      alignItems: "end",*/}
                    {/*    }}*/}
                    {/*  >*/}
                    {/*    <Text>{r.message}</Text>*/}
                    {/*  </Box>*/}
                    {/*  <Text color="gray" size="0.8rem">*/}
                    {/*    day*/}
                    {/*  </Text>*/}
                    {/*</Box>*/}
                    <MessageBubble sender={userInfo?.name === r.sender}>
                      {r.message}
                    </MessageBubble>
                  </Box>
                );
              }
            })}
        </Box>
      </Box>
      <Box style={{ marginTop: "0.8rem" }}>
        <input
          onKeyDown={postMessageEvent}
          onChange={inputProps.onChange}
          value={inputProps.value}
          style={{
            border: "1px solid gray",
            padding: "0.7rem 1rem",
            width: "90%",
          }}
        />
      </Box>
    </>
  );
};
export default ChatMessage;

const Box = styled.div``;
const Text = styled.div``;
const MessageBubble = styled.div`
  background-color: ${(props) => (props.sender ? "#DCF8C6" : "#FFFFFF")};
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
  word-wrap: break-word;
  margin-left: ${(props) => (props.sender ? "auto" : "0")};
`;
