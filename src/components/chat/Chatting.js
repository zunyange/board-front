// import React, { useContext, useEffect, useState } from "react";
// import WebSocketContext from "../../websocket/WebSocketProvider";
//
// function Chatting() {
//   const ws = useContext(WebSocketContext);
//   const [items, setItems] = useState([]);
//
//   useEffect(() => {
//     // WebSocket 인스턴스가 사용가능한지
//
//     if (ws && ws.current) {
//       const handleMessage = (evt) => {
//         const data = JSON.parse(evt.data);
//         setItems((prevItems) => [...prevItems, data.chat]);
//       };
//       ws.current.addEventListener("message", handleMessage);
//       return () => {
//         ws.current.removeEventListener("message", handleMessage);
//       };
//     } else {
//       console.error("WebSocket is not connected");
//     }
//   }, [ws]);
//
//   return (
//     <div>
//       <ul>
//         {items.map((message, index) => (
//           <li key={index}>{message}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//
// export default Chatting;
