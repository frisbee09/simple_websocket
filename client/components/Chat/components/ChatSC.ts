import styled, { css } from "styled-components";
import { media } from "../../App/config/MediaQuery";

export const ChatWrapper = styled.div`
  display: flex;
  min-height: 0;
  max-height: 100%;

  flex-flow: column nowrap;
  ${media.s`
      grid-row-start: 2;
  `}
  background: #58a4b0;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
`;

export const MessageArea = styled.div`
  min-height: 10px;
  flex: 1;

  display: grid;
  align-content: end;
  overflow: auto;

  grid-template-columns: auto 1fr auto;
  grid-auto-rows: 20px;

  .user {
    font-style: bold;
    padding-right: 3px;
  }

  .message {
    color: #373f51;
  }

  .date {
    font-style: italic;
  }

  span {
    margin: 3px 0;
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
