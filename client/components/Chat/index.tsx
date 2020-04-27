import * as React from "react";
import styled from "styled-components";
import * as io from "socket.io-client";
import { sendMessage } from "../../../redux/server/actions";
import * as cuid from "cuid";

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

const Chat: React.FC<{}> = () => {
  const socket = useSocket();
  const [input, setInput] = React.useState<string>("");

  const handleSubmit = () => {
    const action = sendMessage(`guest${cuid()}`, input);
    socket?.emit(action.payload.key, action);
    setInput("");
  };

  return (
    <ChatWrapper>
      <MessageArea />
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
