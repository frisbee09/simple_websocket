import * as React from "react";
import styled from "styled-components";
import * as io from "socket.io-client";
import { sendMessage } from "../../../redux/server/actions";
import * as cuid from "cuid";
import { Message } from "../../../redux/server/state";
import ChatMessage from "./components/ChatMessage";

interface ChatProps {}

const ChatWrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-flow: column nowrap;
`;

const MessageArea = styled.div`
  min-height: 10px;
  flex: 1;

  display: grid;
  align-content: end;

  grid-template-columns: auto 1fr auto;
  grid-auto-rows: 20px;
`;

const ChatBarWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;

  width: 100%;
  height: 3rem;

  > input {
    flex: 1;
  }

  > * {
    height: 100%;
  }
  font-size: 1.4rem;
`;

const useSocket = () => {
  const socket = React.useRef<SocketIOClient.Socket>();
  React.useEffect(() => {
    socket.current = io.connect("/");

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return socket.current;
};

const handleReceiveMessages = (
  socket?: SocketIOClient.Socket,
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  if (socket && setMessages) {
    socket?.on("CHAT_MESSAGE", setMessages);
  }
};

const Chat: React.FC<{}> = () => {
  const socket = useSocket();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState<string>("");

  handleReceiveMessages(socket, setMessages);

  const handleSubmit = () => {
    const action = sendMessage(`guest${cuid()}`, input);
    socket?.emit(action.payload.key, action);
    setInput("");
  };

  return (
    <ChatWrapper>
      <MessageArea>{messages.map(ChatMessage)}</MessageArea>
      <ChatBarWrapper>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </ChatBarWrapper>
    </ChatWrapper>
  );
};

export default Chat;
