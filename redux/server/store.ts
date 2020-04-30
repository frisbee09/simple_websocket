import { createStore } from "redux";
import serverReducer from "./reducer";
import { ServerActions } from "../types";

const store = createStore(serverReducer);

export const withDispatch = (
  socketListener: (action: any) => any
) => {
  return (action: any) => {
    store.dispatch(action);
    socketListener(action);
  };
};

export default store;
