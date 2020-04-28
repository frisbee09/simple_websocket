import store from "../../redux/server/store";
import { WELCOME_USER, USER_JOINED, SIGN_IN } from "./constants";
import {
  REGISTER_USER,
  registerUser,
  persistUser,
} from "../../redux/server/actions";

export const handleConnection = (socket: SocketIO.Socket) => {
  const state = store.getState();
  const cookie = socket.handshake.headers.cookie;
  if (state.users.cookies.includes(cookie)) {
    const { name, id } = state.users.byId[cookie];
    console.log(`User "${name}" has connected.`);
    socket.broadcast.emit(USER_JOINED, name);
    socket.emit(WELCOME_USER, { name, id });
  } else {
    console.log(`A new friend! Please sign in.`);
    socket.emit(SIGN_IN);
  }
};

export const handleRegister = (socket: SocketIO.Socket) => {
  socket.on(REGISTER_USER, (action: ReturnType<typeof registerUser>) => {
    const { user } = action.payload;
    const cookie = socket.handshake.headers.cookie;

    const persistAction = persistUser(user, cookie);

    console.log(`Welcome user, ${user}`);
    store.dispatch(persistAction);
    socket.emit(WELCOME_USER, { name: user, id: persistAction.payload.id });
  });
};
