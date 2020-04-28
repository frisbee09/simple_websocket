import { Socket } from "socket.io";
import {
  CHAT_MESSAGE,
  REQUEST_INITIAL_MESSAGES,
  INITIAL_MESSAGES,
} from "./constants";
import { sendMessage } from "../../redux/server/actions";
import store from "../../redux/server/store";
import { io } from "../setup";

export const handleChat = (socket: Socket) => {
  socket.on(CHAT_MESSAGE, (action: ReturnType<typeof sendMessage>) => {
    store.dispatch(action);
    console.log(`${action.payload.user} said "${action.payload.message}"`);

    io.emit(CHAT_MESSAGE, store.getState().messages);
  });
};

export const handleRequestMessages = (socket: Socket) => {
  socket.on(REQUEST_INITIAL_MESSAGES, () => {
    // Send back the last 20 messages
    socket.emit(INITIAL_MESSAGES, store.getState().messages.slice(-20));
  });
};
