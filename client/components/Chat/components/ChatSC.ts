import styled from "styled-components";

export const ChatWrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-flow: column nowrap;
`;

export const MessageArea = styled.div`
  min-height: 10px;
  flex: 1;

  display: grid;
  align-content: end;

  grid-template-columns: auto 1fr auto;
  grid-auto-rows: 20px;
`;

export const ChatBarWrapper = styled.div`
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
