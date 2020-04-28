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
  messages: [],
};

export default initialState;
