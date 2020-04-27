import initialState, { ServerState } from "./state";
import * as serverActions from "./actions";
import { getType } from "typesafe-actions";
import { ServerActions } from "../types";

const serverReducer = (
  state: ServerState = initialState,
  action: ServerActions
) => {
  switch (action.type) {
    case getType(serverActions.sendMessage):
      const message = Object.assign({}, action.payload, { timeId: Date.now() });
      return { ...state, messages: [...state.messages, message] };
    default:
      return state;
  }
};

export default serverReducer;
