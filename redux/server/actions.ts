import { createAction } from "typesafe-actions";
import * as cuid from "cuid";

export const SEND_MESSAGE = "SEND_MESSAGE";
export const sendMessage = createAction(
  SEND_MESSAGE,
  (userId: string, message: string) => ({
    key: "CHAT_MESSAGE",
    userId,
    message,
  })
)<{
  key: "CHAT_MESSAGE";
  userId: string;
  message: string;
}>();

export const REGISTER_USER = "REGISTER_USER";
export const registerUser = createAction(REGISTER_USER, (user: string) => ({
  key: REGISTER_USER,
  user,
}))<{
  key: typeof REGISTER_USER;
  user: string;
}>();

export const PERSIST_USER = "PERSIST_USER";
export const persistUser = createAction(
  PERSIST_USER,
  (user: string, cookie: string) => ({
    id: cuid(),
    user,
  }),
  (user: string, cookie: string) => ({
    cookie,
  })
)<
  {
    id: string;
    user: string;
  },
  {
    cookie: string;
  }
>();
