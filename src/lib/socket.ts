import { io } from "socket.io-client";

const socket = io("ws://messenger-clone-socket.herokuapp.com", { autoConnect: false, forceNew: true });
export default socket;
