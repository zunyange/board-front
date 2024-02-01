// import React, { useContext, useState } from "react";
// import WebSocketContext from "../../websocket/WebSocketProvider";
//
// function InputBox() {
//   const [message, setMessage] = useState("");
//   const ws = useContext(WebSocketContext);
//
//   const handleChangeText = (e) => {
//     setMessage(e.target.value);
//   };
//
//   const handleClickSubmit = () => {
//     if (ws && ws.current) {
//       ws.current.send(
//         JSON.stringify({
//           chat: message,
//         }),
//       );
//       setMessage("");
//     } else {
//       console.error("WebSocket is not connected");
//     }
//   };
//
//   return (
//     <div>
//       <input type="text" value={message} onChange={handleChangeText}></input>
//       <button type="button" onClick={handleClickSubmit}>
//         Send!
//       </button>
//     </div>
//   );
// }
//
// export default InputBox;
