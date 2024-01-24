import React from "react";
import styled from "styled-components";

function List({ title, onEdit, onAdd }) {
  return (
    <ListContainer>
      <TitleWrap>
        <ListTitle>Board List</ListTitle>
        <AddBoard onClick={onAdd}>+</AddBoard>
      </TitleWrap>
      <NoteTitle>{title}</NoteTitle>
    </ListContainer>
  );
}

export default List;

const ListContainer = styled.div`
  padding: 0 25px;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ListTitle = styled.div`
  font-size: ${(props) => props.theme.l};
  font-weight: bold;
`;

const AddBoard = styled.div`
  cursor: pointer;
  font-size: ${(props) => props.theme.l};
  font-weight: bold;
`;

const NoteTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 280px;
  line-height: 30px;
`;
