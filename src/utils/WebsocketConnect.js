import Stomp from "stompjs";
import sockJs from "sockjs-client";

export const WebsocketConnect = () => {
  const socket = new sockJs("http://192.168.0.76:8011/ws-stomp", null, {
    transports: ["websocket", "xhr-streaming", "xhr-polling"],
  });

  const _stomp = Stomp.over(socket);
  return _stomp;
};
