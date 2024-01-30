import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function BoardList({
  data,
  onAdd,
  onEdit,
  currentPage,
  handlePrevPage,
  totalPages,
  handleNextPage,
}) {
  console.log("BoardList", data);

  return (
    <ListContainer>
      <TitleWrap>
        <ListTitle>Board List</ListTitle>
        <AddBoard onClick={onAdd}>+</AddBoard>
      </TitleWrap>
      {data.map((board, index) => (
        <Link
          to={`/boards/${board.id}`}
          key={board.id}
          onClick={() => onEdit(board)}
          style={{ textDecoration: "none" }}
        >
          <NoteTitle>
            <Title>
              {index + 1} | {board.title}
            </Title>
            <Writer>작성자: {board.email?.split("@")[0] || "Unknown"}</Writer>
          </NoteTitle>
          {/*<DeleteBoard onClick={() => onDelete(board.id)}>Delete</DeleteBoard>*/}
        </Link>
      ))}
      <PaginationContainer>
        {currentPage > 0 && <button onClick={handlePrevPage}>Previous</button>}
        {currentPage < totalPages - 1 && (
          <button onClick={handleNextPage}>Next</button>
        )}
      </PaginationContainer>
    </ListContainer>
  );
}

export default BoardList;

const ListContainer = styled.div`
  padding: 0 30px;
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
  display: flex;
  justify-content: space-between;

  line-height: 30px;
  color: #000000;
  margin: 15px;
`;

const Title = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 320px;
`;

const Writer = styled.div`
  font-size: ${(props) => props.theme.s};
`;

const DeleteBoard = styled.div``;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; // Adjust the styling as needed

  button {
    margin: 0 10px;
    padding: 5px 15px;
    // Add more button styling as needed
  }
`;
