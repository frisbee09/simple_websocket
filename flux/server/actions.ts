import { createAction } from "typesafe-actions";
import * as cuid from "cuid";

export const SEND_MESSAGE = "SEND_MESSAGE";
export const sendMessage = createAction(
  SEND_MESSAGE,
  (user: string, message: string) => ({
    id: cuid(),
    user,
    message,
  })
)<{
  id: string;
  user: string;
  message: string;
}>();
