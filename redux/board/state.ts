import * as cuid from "cuid";
import { IPiece } from "../piece/types/IPiece";

export interface BoardState {
  byId: {
    [id: string]: IPiece;
  };
  ids: string[];
}
const initialPieceId = cuid();

export const initialBoardState = {
  byId: {
    [initialPieceId]: {
      id: initialPieceId,
      x: 0,
      y: 200,
      contains: [],
      emoji: `💩`,
    },
  },
  ids: [initialPieceId],
};
