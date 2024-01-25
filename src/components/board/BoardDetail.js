import React from "react";
import styled from "styled-components";
///필요없는 파일 (아직까지는)
const BoardDetail = (title, content, handleTitle, handleContent) => {
  return (
    <div>
      <BoardContainer>
        <input
          defaultValue={title}
          type="text"
          placeholder="Title"
          onChange={handleTitle}
        />
        <textarea defaultValue={content} onChange={handleContent} rows="20" />
      </BoardContainer>
    </div>
  );
};

export default BoardDetail;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  input {
    height: 50px;
    padding-left: 10px;
    margin-bottom: 10px;
    font-size: ${(props) => props.theme.l};
    &::placeholder {
      font-size: ${(props) => props.theme.l};
    }
  }
  textarea {
    line-height: 30px;
    font-size: ${(props) => props.theme.l};
    padding: 15px;
  }
`;
