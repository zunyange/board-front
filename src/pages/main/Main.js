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
  const [email, setEmail] = useState("");
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
    setEmail(board.email);
    setSelectedList(board.id);
    setCreatedAt(board.createdAt);
    console.log("click", board);
  };

  const AddBoard = () => {
    setForm({
      ...form,
      title: "",
      content: "",
    });
    setEmail("");
    setCreatedAt("");
  };

  //게시글을 수정하거나 새로운 게시글을 생성
  const commitCreate = async () => {
    const isEdit = selectedList !== null;

    if (isEdit) {
      //게시글 중 하나를 선택했을 때
      const updateData = { title, content, email };
      console.log("22", id);
      //fetch 문
      // try {
      //   const response = await fetch(`/api/boards/${selectedList}`, {
      //     method: "PATCH",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(updateData),
      //   });
      //
      //   if (!response.ok) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      //   }

      try {
        const response = await axios.patch(
          `/api/boards/${selectedList}`,
          updateData,
        );
        const updatedBoard = response.data;
        setCreatedAt(updatedBoard.createdAt); // 수정된 시간으로 상태 업데이트
        // 게시글 목록을 갱신
        await fetchBoards(); // 전체 게시글 목록을 다시 불러오는 함수 호출
        //기존의 목록을 직접 업데이트하는 방법
        // setData((prevData) =>
        //   prevData.map((post) =>
        //     post.id === selectedList ? { ...post, ...updatedBoard } : post,
        //   ),
        // );
      } catch (error) {
        console.error("Failed to update board:", error);
      }
    } else {
      //선택한 게시글이 없을 때
      const newPost = {
        title,
        content,
        email,
        createdAt,
      };
      try {
        const response = await axios.post("/api/boards", newPost);
        const createdBoard = response.data; // Assuming this contains the created board data

        setCreatedAt(createdBoard.createdAt); // 생성된 시간으로 상태 업데이트
        await fetchBoards();
      } catch (error) {
        console.error("Error creating new board:", error);
      }
    }

    setForm({
      title: "",
      content: "",
    });
    setEmail("");
    setCreatedAt("");
    setSelectedList(null);
  };

  const isDisabled = !title || !content;

  const fetchBoards = async () => {
    // try {
    //   const response = await axios.get("http://192.168.0.76:8080/api/boards");
    //   setData(response.data);
    // }
    try {
      // const response = await fetch("/api/boards");
      const response = await fetch("/data/board.json");
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching boards:", error);
      setData([]); // In the event of an error, reset the data to an empty array.
    }
  };

  const fetchBoardDetails = async () => {
    try {
      await axios.get(`/api/boards/${id}`);

      // Assuming the response returns an object with 'title', 'content', etc.

      setForm({
        title: title,
        content: content,
      });
      // setEmail(email);
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

  return (
    <S.Main>
      {Array.isArray(data) && (
        <BoardList onAdd={AddBoard} data={data} onEdit={handleEdit} />
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
      </S.BoardContainer>
    </S.Main>
  );
}

export default Main;
