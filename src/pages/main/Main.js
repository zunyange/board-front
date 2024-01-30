import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./MainStyle.js";
import BoardList from "../../components/board/BoardList";
import axios from "axios";

function Main() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    email: "",
  });

  const [userEmail, setUserEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [selectedList, setSelectedList] = useState(null);
  const [data, setData] = useState(null);

  const { id } = useParams();
  const { title, content } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //선택한 리스트의 데이터 불러오기
  const handleEdit = (board) => {
    setForm({
      title: board.title,
      content: board.content,
    });

    setSelectedList(board.id);
    setCreatedAt(board.createdAt);
    console.log("click", board);
  };

  const AddBoard = () => {
    setForm({
      title: "",
      content: "",
    });
    setCreatedAt("");
    setSelectedList(null); //get요청으로 바꾸기
  };

  const isDisabled = !title || !content;
  console.log("email", userEmail);
  //게시글을 수정하거나 새로운 게시글을 생성
  const commitCreate = async () => {
    try {
      let response;
      const postData = { title, content, email: userEmail }; // userEmail is used for a new post

      if (selectedList) {
        response = await axios.patch(`/api/boards/${selectedList}`, postData);
        const updatedBoard = response.data;
        setCreatedAt(updatedBoard.createdAt); // Update the time of creation/modification
      } else {
        // 새 게시글 생성
        response = await axios.post("/api/boards", { data: postData });
        const createdBoard = response.data;
        setCreatedAt(createdBoard.createdAt);
      }
      await fetchBoards(); // 게시글 목록 갱신 : 전체 게시글 목록을 다시 불러오는 함수 호출
      // form 초기화
      setForm({ title: "", content: "" });

      setCreatedAt("");
      setSelectedList(null);
    } catch (error) {
      console.error("Error creating/updating board:", error);
    }
  };

  // 게시글 삭제
  const deleteBoard = async (boardId) => {
    try {
      await axios.delete(`/api/boards/${id}`);
      setData((prevData) => prevData.filter((board) => board.id !== boardId));
    } catch (error) {
      console.error("Failed to delete board:", error);
    }
  };

  const fetchBoards = async () => {
    try {
      const response = await axios.get("/api/boards");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching boards:", error);
      setData([]); // In the event of an error, reset the data to an empty array.
    }
  };

  const fetchBoardDetails = async () => {
    try {
      await axios.get(`/api/boards/${id}`);
      setForm({
        title: title,
        content: content,
      });
      setCreatedAt(createdAt);
    } catch (error) {
      console.error(`Error fetching board details for id ${id}:`, error);
    }
  };
  // 날짜 format 변경
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("ko-KR", options);
  };

  useEffect(() => {
    if (id) {
      fetchBoardDetails(); // 특정 게시글 상세 정보를 불러오는 함수
    } else {
      fetchBoards(); // 전체 게시글 목록을 불러오는 함수
    }
  }, [id]); // The useEffect hook will re-run whenever 'id' changes.

  useEffect(() => {
    const email = localStorage.getItem("userEmail") || "";
    setUserEmail(email);
  }, []);

  return (
    <S.Main>
      {Array.isArray(data) && (
        <BoardList
          onAdd={AddBoard}
          data={data}
          onEdit={handleEdit}
          onDelete={deleteBoard}
        />
      )}
      <S.BoardContainer>
        <input
          value={title || ""}
          type="text"
          name={"title"}
          placeholder="Title"
          onChange={handleChange}
        />
        <textarea
          name={"content"}
          value={content}
          onChange={handleChange}
          rows="20"
        />
        <S.UpdatedTime>
          업데이트 시간 : {formatCreatedAt(createdAt)}
        </S.UpdatedTime>
        <S.CreateBoard onClick={isDisabled ? null : commitCreate}>
          작성 완료!
        </S.CreateBoard>
        <S.DeleteBoard onClick={deleteBoard}>🗑️삭제🗑️</S.DeleteBoard>
      </S.BoardContainer>
    </S.Main>
  );
}

export default Main;
// 직접 업데이트하는 방법 commitCreate의 if selectedList
// setData((prevData) =>
//   prevData.map((post) =>
//     post.id === selectedList ? { ...post, ...updatedBoard } : post,
//   ),
// );
