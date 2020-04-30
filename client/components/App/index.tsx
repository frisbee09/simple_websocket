import * as React from "react";
import styled from "styled-components";
import { GlobalStyle } from "./config/GlobalStyle";
import Chat from "../Chat";
import { SocketContext, useSocketInitialisation } from "../../socket/useSocket";
import { useRegistration } from "../../socket/handleRegister";
import { registerUser } from "../../../redux/server/actions";
import SignIn from "./components/SignIn";
import { media } from "./config/MediaQuery";
import PlayArea from "../Play";

const AppWrapper = styled.div`
  height: 100%;
  display: grid;

  ${media.s`
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 3fr) minmax(0, 1fr);
  `}

  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
`;

const App: React.FC<{}> = () => {
  const socket = useSocketInitialisation();
  const [user, setUser] = React.useState<{ name: string; id: string }>({
    name: "",
    id: "",
  });
  useRegistration(socket, setUser);

  const requestRegister = (name: string) => {
    const action = registerUser(name);
    socket?.emit(action.payload.key, action);
  };

  return (
    <AppWrapper id="appWrapper">
      <SocketContext.Provider value={socket}>
        <GlobalStyle />
        {user.name && user.id ? (
          <>
            <Chat userId={user.id} />
            <PlayArea />
          </>
        ) : (
          <SignIn register={requestRegister} />
        )}
      </SocketContext.Provider>
    </AppWrapper>
  );
};
export default App;
