import * as React from "react";
import styled from "styled-components";
import { GlobalStyle } from "./App.config";
import Chat from "../Chat";
import Cube from "../Pieces/components/Cube";

const AppWrapper = styled.div`
  height: 100%;
`;

const App: React.FC<{}> = () => (
  <AppWrapper>
    <GlobalStyle />
    <Cube />
    <Chat />
  </AppWrapper>
);

export default App;
