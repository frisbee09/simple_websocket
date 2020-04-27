import { createStore } from "redux";
import serverReducer from "./reducer";

const store = createStore(serverReducer);

export default store;
