import * as React from "react";
import styled from "styled-components";
import * as io from "socket.io-client";
import { sendMessage, registerUser } from "../../../redux/server/actions";
import { Message } from "../../../redux/server/state";
import ChatMessage from "./components/ChatMessage";
import { SIGN_IN, WELCOME_USER } from "../../../server/handshake/constants";
import SignIn from "./components/SignIn";
import { ChatWrapper } from "./components/ChatSC";
import ChatApp from "./components/ChatApp";

interface ChatProps {}

const useSocket = () => {
  const [socket, setSocket] = React.useState<SocketIOClient.Socket>();
  React.useEffect(() => {
    console.log(`Connecting to socket.io`);
    const newSocket = io.connect("/");
    newSocket.on("connect", () => {
      console.log(`Connected with id ${newSocket.id}`);
      setSocket(newSocket);
    });

    return () => {
      socket?.disconnect();
      setSocket(undefined);
    };
  }, []);

  return socket;
};

const handleRegister = (
  socket: SocketIOClient.Socket,
  setUser: React.Dispatch<React.SetStateAction<{ name: string; id: string }>>
) => {
  socket.on(SIGN_IN, () => {
    console.log("We need to sign in.");
    setUser({ name: "", id: "" });
  });
  socket.on(WELCOME_USER, (userInfo: any) => setUser(userInfo));
};

const handleReceiveMessages = (
  socket: SocketIOClient.Socket,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  socket.on("CHAT_MESSAGE", setMessages);
};

const Chat: React.FC<{}> = () => {
  window.localStorage.setItem("debug", "socket.io-client:socket");
  const socket = useSocket();
  const [user, setUser] = React.useState<{ name: string; id: string }>({
    name: "",
    id: "",
  });
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    if (socket) {
      handleReceiveMessages(socket, setMessages);
      handleRegister(socket, setUser);
    }
  }, [socket?.id]);

  const requestRegister = (name: string) => {
    const action = registerUser(name);
    socket?.emit(action.payload.key, action);
  };

  const handleSubmit = (input: string) => {
    const action = sendMessage(user.id, input);
    socket?.emit(action.payload.key, action);
  };

  return (
    <ChatWrapper>
      {user.name && user.id ? (
        <ChatApp {...{ handleSubmit, messages }} />
      ) : (
        <SignIn register={requestRegister} />
      )}
      {JSON.stringify(user)}
    </ChatWrapper>
  );
};

export default Chat;
