import styled, { css } from "styled-components";
import { media } from "../../App/config/MediaQuery";

export const ChatWrapper = styled.div`
  display: flex;
  min-height: 0;
  max-height: 100%;

  flex-flow: column nowrap;
  background: #58a4b0;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8);

  ${media.s`
      grid-row-start: 2;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.8);
  `}
`;

export const MessageArea = styled.div`
  min-height: 10px;
  flex: 1;

  display: grid;
  align-content: end;
  overflow: auto;

  grid-template-columns: auto 1fr auto;
  grid-auto-rows: minmax(20px, auto);

  .user {
    font-style: bold;
  }

  .message {
    color: #373f51;
  }

  .date {
    font-style: italic;
  }

  span {
    padding: 3px 2px;
    min-height: 2rem;
    background: #58a4b0;
    &:nth-of-type(6n + 4),
    &:nth-of-type(6n + 5),
    &:nth-of-type(6n + 6) {
      background: #468692;
    }
  }
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
