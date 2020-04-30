import {
  CHAT_MESSAGE,
  REQUEST_INITIAL_MESSAGES,
  INITIAL_MESSAGES,
} from "./constants";
import { sendMessage } from "../../redux/server/actions";
import store, { withDispatch } from "../../redux/server/store";
import { io } from "../setup";

export const handleChat = (socket: SocketIO.Socket) => {
  socket.on(
    CHAT_MESSAGE,
    withDispatch((action: ReturnType<typeof sendMessage>) => {
      const userName = store.getState().users.byId[action.payload.userId].name;
      console.log(`${userName} said "${action.payload.message}"`);
      const newMessage = store.getState().messages.slice(-1);

      io.emit(CHAT_MESSAGE, newMessage);
    })
  );
};

export const handleRequestMessages = (socket: SocketIO.Socket) => {
  socket.on(REQUEST_INITIAL_MESSAGES, () => {
    // Send back the last 20 messages
    socket.emit(INITIAL_MESSAGES, store.getState().messages.slice(-20));
  });
};
