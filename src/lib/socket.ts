import { io } from "socket.io-client";

const socketURL =
  process.env.NODE_ENV === "development" ? "ws://localhost:8000" : "ws://messenger-clone-socket.herokuapp.com";
const socket = io(socketURL, {
  autoConnect: false,
  forceNew: true,
  withCredentials: false,
});
export default socket;
