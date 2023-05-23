import { io } from "socket.io-client";

const socketURL =
  process.env.NODE_ENV === "development" ? "wss://localhost:8000" : "wss://messenger-clone-socket.herokuapp.com";
const socket = io(socketURL, {
  autoConnect: false,
  forceNew: true,
  withCredentials: true,
});
export default socket;
