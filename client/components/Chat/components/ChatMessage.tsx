import * as React from "react";
import { Message } from "../../../../redux/server/state";

const ChatMessage: React.FC<Message> = ({ user, id, timeId, message }) => (
  <>
    <span>{user}: </span>
    <span>{message}</span>
    <span>{new Date(timeId).toLocaleString()}</span>
  </>
);

export default ChatMessage;
