import React, { useEffect, useState } from "react";
import * as S from "./MainStyle.js";
import List from "../../components/List";

function Main() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [data, setData] = useState(null);

  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const handleTitle = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };
  const handleEdit = (index) => {};

  const AddBoard = () => {
    setTitle("");
    setContent([]);
    setSelectedList(null);
  };

  const getData = async () => {
    try {
      // const response = await fetch("http://192.168.0.76:8000/api/boards");
      const response = await fetch("/data/board.json");
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(title);

  useEffect(() => {
    getData();
  }, []);

  const memoInfo = () => {
    const input = {
      title: title,
      content: content,
    };

    setTitle([...title], input);
  };
  const commitCreate = (e) => {
    memoInfo();
    setTitle("");
    setContent([]);
  };

  // useEffect(() => {
  //   fetch("/data/board.json", {
  //     // headers: {
  //     //   "Content-Type": "application/json;charset=utf-8",
  //     //   Authorization: localStorage.getItem("token"),
  //     // },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.data[0].createdAt);
  //     })
  //     .catch((error) => {
  //       console.error("Fetch error:", error);
  //     });
  // }, []);

  return (
    <S.Main title={title}>
      <List onEdit={handleEdit} onAdd={AddBoard} />
      <S.BoardContainer>
        <input
          value={title}
          type="text"
          placeholder="Title"
          onChange={handleTitle}
        />
        <textarea value={content} onChange={handleContent} rows="30" />
        <S.CreateBoard onClick={commitCreate}>작성 완료!</S.CreateBoard>
      </S.BoardContainer>
    </S.Main>
  );
}

export default Main;
