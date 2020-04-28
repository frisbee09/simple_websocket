export interface Message {
  user: string;
  id: string;
  timeId: number;
  message: string;
}

export interface User {
  cookie: string;
  name: string;
}

export interface ServerState {
  users: {
    byCookie: { [cookie: string]: User };
    cookies: string[];
  };
  messages: Message[];
}

const initialState = {
  users: {
    byCookie: {},
    cookies: [],
  },
  messages: [],
};

export default initialState;
