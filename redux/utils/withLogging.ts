import { ActionType } from "typesafe-actions";
import { RootActions } from "../types";

const withLogging = <S, A extends RootActions>(
  reducer: React.Reducer<S, A>
) => {
  return (state: S, action: A) => {
    try {
      if (process.env.NODE_ENV === "development") {
        console.groupCollapsed(`%cReducer Action: ${action.type}`, [
          `color: midnightblue`,
        ]);
        console.log(`Before: %o`, state);
        console.log(`Payload: %o`, action.payload);
      }
      const returnState = reducer(state, action);
      if (process.env.NODE_ENV === "development") {
        console.log(`After: %o`, returnState);
        console.groupEnd();
      }
      return returnState;
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.groupEnd();
      }
      console.error(`Error: %o`, err);
      throw Error(`Reducer Failed. Critical.`);
    }
  };
};

export default withLogging;
