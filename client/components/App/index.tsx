import * as React from "react";
import styled from "styled-components";
import { GlobalStyle } from "./App.config";
import Chat from "../Chat";

const AppWrapper = styled.div`
  height: 100%;
`;

const App: React.FC<{}> = () => (
  <AppWrapper>
    <GlobalStyle />
    <Chat />
  </AppWrapper>
);

export default App;
