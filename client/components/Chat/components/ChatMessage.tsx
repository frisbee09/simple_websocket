import * as React from "react";
import { Message } from "../../../../redux/server/state";

const ChatMessage: React.FC<Message> = ({ user, id, timeId, message }) => (
  <>
    <span className="user">{user}: </span>
    <span className="message">{message}</span>
    <span className="date">
      {new Date(timeId).toLocaleString().slice(-8, -3)}
    </span>
  </>
);

export default ChatMessage;
