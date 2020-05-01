import * as cuid from "cuid";

export interface Piece {
  id: string;
  x: number;
  y: number;
  contains: Piece[];
  emoji: string;
}

export interface PiecesState {
  byId: {
    [id: string]: Piece;
  };
  ids: string[];
}
const initialPieceId = cuid();

export const initialPiecesState = {
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
