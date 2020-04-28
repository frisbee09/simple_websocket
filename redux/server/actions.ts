import { createAction } from "typesafe-actions";
import * as cuid from "cuid";

export const SEND_MESSAGE = "SEND_MESSAGE";
export const sendMessage = createAction(
  SEND_MESSAGE,
  (user: string, message: string) => ({
    key: "CHAT_MESSAGE",
    id: cuid(),
    user,
    message,
  })
)<{
  key: "CHAT_MESSAGE";
  id: string;
  user: string;
  message: string;
}>();

export const REGISTER_USER = "REGISTER_USER";
export const registerUser = createAction(REGISTER_USER, (user: string) => ({
  key: REGISTER_USER,
  id: cuid(),
  user,
}))<{
  key: typeof REGISTER_USER;
  id: string;
  user: string;
}>();
