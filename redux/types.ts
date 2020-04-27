import { ActionType } from "typesafe-actions";

import * as sA from "./server/actions";
const serverActions = { ...sA };
export type ServerActions = ActionType<typeof serverActions>;
