import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./MainStyle.js";
import BoardList from "../../components/board/BoardList";

function Main() {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

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

  // <form onSubmit={handleSubmit}>
  //   <button type={'submit'}></button>
  // </form>

  const { title, content } = form;

  // const handleContent = (e) => {
  //   setContent(e.target.value);
  // };
  // const handleTitle = (e) => {
  //   setTitle(e.target.value);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleEdit = (board) => {
    // setTitle(board.title);
    // setContent(board.content);
    setForm({
      ...form,
      title: board.title,
      content: board.content,
    });
    setSelectedList(board.id);
    setCreatedAt(board.createdAt);
    console.log("click", board);
  };

  const AddBoard = () => {
    // setTitle("");
    // setContent("");
    setForm({
      ...form,
      title: "",
      content: "",
    });
    setSelectedList(null);
    setCreatedAt("");
  };

  const commitCreate = () => {
    const isEdit = selectedList !== null;
    const updatedData = data.map((post) =>
      post.id === selectedList
        ? {
            ...post,
            title: title,
            content: content,
            createdAt: new Date().toLocaleString(),
          }
        : post,
    );

    if (isEdit) {
      setData(updatedData);
    } else {
      const newPost = {
        id: data.length + 1,
        title: title,
        content: content,
        createdAt: new Date().toLocaleString(), // Set createdAt for new post
      };
      setData([...data, newPost]);
      setCreatedAt(newPost.createdAt);
    }

    setForm({
      ...form,
      title: "",
      content: "",
    });
    // setTitle("");
    // setContent("");
    setCreatedAt("");
    setSelectedList(null);
  };
  const isDisabled = !title || !content;
  const formatCreatedAt = (createdAt) => {
    try {
      const date = new Date(createdAt);
      if (isNaN(date)) {
        throw new Error("Invalid Date");
      }
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      return date.toLocaleString("ko-KR", options);
    } catch (error) {
      return createdAt;
    }
  };
  useEffect(() => {
    // This is an async function that will be used to fetch all the boards when 'id' is not present.
    // In other words, this function will run when the component is first mounted and anytime
    // the 'id' changes to 'undefined' (implying that the user is not viewing/editing a specific board).
    const fetchBoards = async () => {
      try {
        const response = await fetch("http://192.168.0.76:8000/api/boards");
        const result = await response.json();
        setData(result.data);
        // Assuming the response has a 'data' property which is an array of boards.
      } catch (error) {
        console.error("Error fetching boards:", error);
        setData([]); // In the event of an error, reset the data to an empty array.
      }
    };

    // This is an async function that will be invoked when an 'id' is present.
    // This fetches the details of a single board by its identifier.
    const fetchBoardDetails = async () => {
      try {
        const response = await fetch(
          `http://192.168.0.76:8000/api/boards/${id}`,
        );
        const boardDetails = await response.json();

        // Assuming the response returns an object with 'title', 'content', etc.

        setForm({
          ...form,
          title: boardDetails.title,
          content: boardDetails.content,
        });
        // setTitle(boardDetails.title);
        // setContent(boardDetails.content);
        setEmail(boardDetails.email); // Set the email state with the retrieved email value
        setCreatedAt(boardDetails.createdAt);
      } catch (error) {
        console.error(`Error fetching board details for id ${id}:`, error);
      }
    };

    // 'id' is a variable declared outside of this useEffect, derived from useParams().
    // If 'id' is defined (truthy), it implies that we are intending to view/edit a specific board,
    // hence we call fetchBoardDetails().
    // If 'id' is undefined (falsy), it means we are on the list-view page without an id param in the URL,
    // hence we call fetchBoards().
    if (id) {
      fetchBoardDetails();
    } else {
      fetchBoards();
    }

    console.log("id", id);
  }, []); // The useEffect hook will re-run whenever 'id' changes.

  return (
    <S.Main>
      {Array.isArray(data) && (
        <BoardList onEdit={handleEdit} onAdd={AddBoard} data={data} />
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
        <S.BoardInfo>
          <S.Writer>{email}</S.Writer>
        </S.BoardInfo>
        <S.UpdatedTime>
          업데이트 시간 : {createdAt && formatCreatedAt(createdAt)}
        </S.UpdatedTime>
        <S.CreateBoard onClick={isDisabled ? null : commitCreate}>
          작성 완료!
        </S.CreateBoard>
      </S.BoardContainer>
    </S.Main>
  );
}

export default Main;
