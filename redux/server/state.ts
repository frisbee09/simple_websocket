export interface Message {
  user: string;
  id: string;
  timeId: number;
  message: string;
}

export interface ServerState {
  messages: Message[];
}

const initialState = {
  messages: [],
};

export default initialState;
