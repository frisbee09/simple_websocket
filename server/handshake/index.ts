import { Socket } from "socket.io";
import store from "../../redux/server/store";
import { WELCOME_USER, USER_JOINED, SIGN_IN } from "./constants";
import { registerUser, REGISTER_USER } from "../../redux/server/actions";

export const handleConnection = (socket: Socket) => {
  const state = store.getState();
  const cookie = socket.handshake.headers.cookie;
  if (state.users.cookies.includes(cookie)) {
    const name = state.users.byCookie[cookie].name;
    console.log(`User "${name}" has connected.`);
    socket.broadcast.emit(USER_JOINED, name);
    socket.emit(WELCOME_USER, name);
  } else {
    socket.emit(SIGN_IN);
  }
};

export const handleRegister = (socket: Socket) => {
  socket.on(REGISTER_USER, (action: ReturnType<typeof registerUser>) => {
    store.dispatch(action);
    socket.emit(WELCOME_USER, action.payload.user);
  });
};
