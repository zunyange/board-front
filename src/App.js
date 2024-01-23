import React, { useState } from "react";
import * as S from "./AppStyle.js";
import List from "./components/List";

function App() {
  const [memo, setMemo] = useState("");
  const [memoData, setMemoData] = useState([]);

  const handleChange = (e) => {
    setMemo(e.target.value);
  };

  const handleSubmit = () => {
    setMemoData([...memoData, memo]);
    setMemo("");
  };

  return (
    <S.Main>
      <List memoData={memoData} />
      <S.BoardContainer>
        <textarea value={memo} onChange={handleChange} />
        <button onClick={handleSubmit}>전송</button>
        <S.SaveBoard>
          {memoData.map((data, index) => (
            <div key={index}>
              {data.split("\n").map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                  {line}
                  {lineIndex !== data.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          ))}
        </S.SaveBoard>
        {/* <S.SaveBoard>
          {memoData.map((data, index) => (
            <div key={index}>{data}</div>
          ))}
        </S.SaveBoard> */}
      </S.BoardContainer>
    </S.Main>
  );
}

export default App;
