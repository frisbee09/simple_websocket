import { ActionType } from "typesafe-actions";

import * as sA from "./server/actions";
const serverActions = { ...sA };
export type ServerActions = ActionType<typeof serverActions>;

import * as pA from "./board/actions";
const piecesActions = { ...pA };
export type PiecesActions = ActionType<typeof piecesActions>;

const rootActions = { ...sA, ...pA };
export type RootActions = ActionType<typeof rootActions>;
