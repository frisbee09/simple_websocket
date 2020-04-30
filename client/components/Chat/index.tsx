import * as React from "react";
import { sendMessage } from "../../../redux/server/actions";
import { Message } from "../../../redux/server/state";
import SignIn from "../App/components/SignIn";
import { ChatWrapper } from "./components/ChatSC";
import ChatApp from "./components/ChatApp";
import { useSocket } from "../../socket/useSocket";
import {
  REQUEST_INITIAL_MESSAGES,
  INITIAL_MESSAGES,
  CHAT_MESSAGE,
} from "../../../server/chat/constants";

interface ChatProps {}

const Chat: React.FC<{ userId: string }> = ({ userId }) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const socket = useSocket();

  const appendMessages = (newMessages: Message[]) => {
    setMessages((currentMessages) => [...currentMessages, ...newMessages]);
  };

  React.useEffect(() => {
    if (socket) {
      socket.on(CHAT_MESSAGE, appendMessages);
      socket.emit(REQUEST_INITIAL_MESSAGES);
      socket.on(INITIAL_MESSAGES, setMessages);
    }
  }, [socket?.id]);

  const handleSubmit = (input: string) => {
    const action = sendMessage(userId, input);
    socket?.emit(action.payload.key, action);
  };

  return (
    <ChatWrapper>
      <ChatApp {...{ handleSubmit, messages }} />
    </ChatWrapper>
  );
};

export default Chat;
