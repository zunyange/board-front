// import React, { useEffect, useRef, useState } from "react";

// const WebSocketContext = React.createContext({ ws: null, isConnected: false });
// const WebSocketContext = React.createContext(null);

// function WebSocketProvider({ children }) {
// const [isConnected, setConnected] = useState(false);
// const webSocketUrl = "ws-stomp://192.168.0.76:8011";
// const ws = useRef(null);

// useEffect(() => {
//   if (!ws.current) {
//     console.log("Initializing WebSocket connection...");
//     ws.current = new WebSocket(webSocketUrl);
//     ws.current.onopen = () => {
//       console.log("connected to " + webSocketUrl);
//     };
//     ws.current.onclose = (error) => {
//       console.log("disconnect from " + webSocketUrl);
//       console.log(error);
//     };
//     ws.current.onerror = (error) => {
//       console.log("connection error " + webSocketUrl);
//       console.log(error);
//     };
//   }
//
//   // 언마운트시 정리
//   return () => {
//     if (ws.current) {
//       ws.current.close();
//     }
//   };
// }, [webSocketUrl]);

//   return (
//     <WebSocketContext.Provider value={{ ws, isConnected }}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// }
// export default WebSocketProvider;
