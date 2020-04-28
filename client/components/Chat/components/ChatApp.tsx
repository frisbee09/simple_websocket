import * as React from "react";
import { MessageArea, ChatBarWrapper } from "./ChatSC";
import ChatMessage from "./ChatMessage";
import { Message } from "../../../../redux/server/state";

const ChatApp: React.FC<{
  messages: Message[];
  handleSubmit: (...args: any[]) => void;
}> = ({ messages, handleSubmit }) => {
  const [input, setInput] = React.useState<string>("");

  const submit = () => {
    handleSubmit(input);
    setInput("");
  };

  return (
    <>
      <MessageArea>
        {messages.map((message) => (
          <ChatMessage {...message} key={`${message.user}${message.timeId}`} />
        ))}
      </MessageArea>
      <ChatBarWrapper>
        <input
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <button type="button" onClick={submit}>
          Submit
        </button>
      </ChatBarWrapper>
    </>
  );
};

export default ChatApp;
