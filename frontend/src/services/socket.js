import { io } from "socket.io-client";

const socket = io("http://localhost:3001", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 50,
  reconnectionDelay: 500,
  autoConnect: false,

});

export default socket;
