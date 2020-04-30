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
} from "../../../server/chat/constants";

interface ChatProps {}

const handleReceiveMessages = (
  socket: SocketIOClient.Socket,
  messages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  socket.on("CHAT_MESSAGE", (newMessages: Message[]) =>
    setMessages([...messages, ...newMessages])
  );

  socket.on(INITIAL_MESSAGES, setMessages);
};

const Chat: React.FC<{ userId: string }> = ({ userId }) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const socket = useSocket();

  React.useEffect(() => {
    if (socket) {
      handleReceiveMessages(socket, messages, setMessages);
      socket.emit(REQUEST_INITIAL_MESSAGES);
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
