import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function BoardList({ data, onEdit, onAdd }) {
  console.log("BoardList", data);

  return (
    <ListContainer>
      <TitleWrap>
        <ListTitle>Board List</ListTitle>
        <AddBoard onClick={onAdd}>+</AddBoard>
      </TitleWrap>
      {data.map((board) => (
        <Link
          to={`/boards/${board.id}`}
          key={board.id}
          onClick={() => onEdit(board)}
          style={{ textDecoration: "none" }}
        >
          <NoteTitle>
            {board.id} | {board.title}
          </NoteTitle>
        </Link>
      ))}
    </ListContainer>
  );
}

export default BoardList;

const ListContainer = styled.div`
  padding: 0 25px;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ListTitle = styled.div`
  font-size: ${(props) => props.theme.xl};
  font-weight: bold;
  padding: 15px;
`;

const AddBoard = styled.div`
  cursor: pointer;
  font-size: ${(props) => props.theme.l};
  font-weight: bold;
  padding: 15px;
`;

const NoteTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 280px;
  line-height: 30px;
  color: #000000;
  margin: 15px;
`;
