import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./MainStyle.js";
import BoardList from "../../components/board/BoardList";
import axios from "axios";

function Main() {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [userEmail, setUserEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [selectedList, setSelectedList] = useState(null);
  const [data, setData] = useState(null);
  //페이지네이션
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5); // Or whatever your default size is
  const [totalPages, setTotalPages] = useState(0);

  const { id } = useParams();
  const { title, content } = form;
  const navigate = useNavigate();
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
    setSelectedList(null);
    navigate("/boards");
  };

  const isDisabled = !title || !content;

  //게시글을 수정하거나 새로운 게시글을 생성
  const commitCreate = async () => {
    try {
      const postData = { title, content, email: userEmail };

      // 기존 게시글 수정
      if (selectedList) {
        // Edit existing post
        const response = await axios.patch(
          `/api/boards/${selectedList}`,
          postData,
        );
        const updatedBoard = response.data;
        setData((prevData) =>
          prevData.map((post) =>
            post.id === selectedList ? { ...post, ...updatedBoard } : post,
          ),
        );
      } else {
        // 새 게시글 생성
        const response = await axios.post("/api/boards", postData);
        const newBoard = response.data;
        setData((prevData) => [...prevData, newBoard]);
      }
      setForm({ title: "", content: "" }); // 폼 초기화
      setSelectedList(null);
      setCurrentPage(0);
      fetchBoards(0, pageSize);
    } catch (error) {
      console.error("Error creating/updating board:", error);
    }
  };

  // 게시글 삭제
  const deleteBoard = async (boardId) => {
    const boardToDelete = data.find((board) => board.id === boardId);
    if (boardToDelete && boardToDelete.email === userEmail) {
      try {
        await axios.delete(`/api/boards/${id}`);
        setData((prevData) => prevData.filter((board) => board.id !== boardId));
      } catch (error) {
        console.error("Failed to delete board:", error);
      }
    } else {
      console.error("You are not authorized to delete this board.");
    }
  };

  const fetchBoards = async (page = 0, size = 5) => {
    try {
      const response = await axios.get(`/api/boards?page=${page}&size=${size}`);
      setData(response.data.data.boardList); // Extracting boardList
      const totalBoards = response.data.data.totalCnt; // Extracting totalCnt
      const totalPages = Math.ceil(totalBoards / pageSize); // Calculating total pages
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching boards:", error);
      // setData([]); // In the event of an error, reset the data to an empty array.
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

  //페이지네이션
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      fetchBoards(currentPage + 1, pageSize);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      fetchBoards(currentPage - 1, pageSize);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBoardDetails();
      // 특정 게시글 상세 정보를 불러오는 함수
    }
  }, [id]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail") || "";
    setUserEmail(email);
    fetchBoards();
    //새로고침해도 /api/boards/id 에 해당하는 데이터가 보이도록 함
    const select = async () => {
      try {
        const response = await axios.get(`/api/boards/${id}`);
        if (response.data && response.data.data) {
          setForm({
            title: response.data.data.title || "",
            content: response.data.data.content || "",
          });
        }
      } catch (error) {
        console.error("Error fetching board details:", error);
      }
    };

    if (id) {
      select();
    }
  }, []);

  useEffect(() => {}, [currentPage]);
  return (
    <S.Main>
      {Array.isArray(data) && (
        <BoardList
          onAdd={AddBoard}
          data={data}
          onEdit={handleEdit}
          onDelete={deleteBoard}
          currentPage={currentPage}
          handlePrevPage={handlePrevPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
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
