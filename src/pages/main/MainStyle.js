import styled from "styled-components";

export const Main = styled.main`
  padding-top: 30px;
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

// export const BoardContainer = styled.div``;
export const BoardContainer = styled.div`
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
export const CreateBoard = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.lightColor};
  margin-top: 10px;
  background-color: ${(props) => props.theme.lightColor};
  border-radius: 10px;
  cursor: pointer;
`;

export const BoardInfo = styled.div``;
export const Writer = styled.div``;

export const UpdatedTime = styled.div`
  margin-top: 10px;
  font-size: ${(props) => props.theme.s};
`;

export const DeleteBoard = styled.div`
  cursor: pointer;
  padding-top: 30px;
`;

export const GoToChat = styled.div`
  padding-top: 20px;
  cursor: pointer;
`;
