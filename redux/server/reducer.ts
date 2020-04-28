import initialState, { ServerState, Message } from "./state";
import * as serverActions from "./actions";
import { getType } from "typesafe-actions";
import { ServerActions } from "../types";
import * as cuid from "cuid";
const serverReducer = (
  state: ServerState = initialState,
  action: ServerActions
) => {
  switch (action.type) {
    case getType(serverActions.sendMessage): {
      const username = state.users.byId[action.payload.userId].name;
      const message: Message = {
        user: username,
        id: cuid(),
        timeId: Date.now(),
        message: action.payload.message,
      };
      return { ...state, messages: [...state.messages, message] };
    }

    case getType(serverActions.registerUser):
      return state;

    case getType(serverActions.persistUser): {
      const newUserId = action.payload.id;
      return {
        ...state,
        users: {
          ...state.users,
          byId: {
            ...state.users.byId,
            [newUserId]: {
              id: newUserId,
              cookie: action.meta.cookie,
              name: action.payload.user,
            },
          },
        },
      };
    }
    default:
      return state;
  }
};

export default serverReducer;
