import { BoardState, initialBoardState } from "../board/state";

export interface Message {
  user: string;
  id: string;
  timeId: number;
  message: string;
}

export interface User {
  id: string;
  cookie: string;
  name: string;
}

export interface ServerState {
  users: {
    byId: { [id: string]: User };
    ids: string[];
    cookies: string[];
    names: string[];
  };
  pieces: BoardState;
  messages: Message[];
}

const initialState: ServerState = {
  users: {
    byId: {},
    get ids() {
      return Object.values(this.byId).map((user) => user.id);
    },
    get cookies() {
      return Object.values(this.byId).map((user) => user.cookie);
    },
    get names() {
      return Object.values(this.byId).map((user) => user.name);
    },
  },
  pieces: initialBoardState,
  messages: [],
};

export default initialState;
