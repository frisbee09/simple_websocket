import { PiecesActions } from "../types";
import { PiecesState, Piece } from "./state";
import * as piecesActions from "./actions";
import { getType } from "typesafe-actions";

export const piecesReducer = (state: PiecesState, action: PiecesActions) => {
  switch (action.type) {
    case getType(piecesActions.receiveGameState):
      /**
       * This should never get called on the server.
       */
      return {
        byId: transformPieceArrayToState(action.payload.game),
        ids: action.payload.game.map((piece) => piece.id),
      };

    case getType(piecesActions.receivePiecesUpdate):
    case getType(piecesActions.sendPiecesUpdateToServer): {
      const updatedArray = mapPiecesToReducerWithAction(
        state,
        piecesActions.updatePiece
      )(action.payload.pieces);

      const updatedState = transformPieceArrayToState(updatedArray);

      return {
        ...state,
        byId: {
          ...state.byId,
          ...updatedState,
        },
      };
    }
    default:
      return state;
  }
};

const singlePieceReducer = (state: Piece, action: PiecesActions) => {
  switch (action.type) {
    case getType(piecesActions.updatePiece):
      return { ...action.payload.piece, emoji: state.emoji };
    default:
      return state;
  }
};

const mapPiecesToReducerWithAction = (
  piecesState: PiecesState,
  action: (piece: Piece) => PiecesActions
) => (updates: Piece[]) =>
  updates
    .filter((piece) => piecesState.ids.includes(piece.id))
    .map((piece) =>
      singlePieceReducer(piecesState.byId[piece.id], action(piece))
    );

const transformPieceArrayToState = (updates: Piece[]) =>
  updates.reduce((newState, piece) => {
    newState[piece.id] = piece;
    return newState;
  }, {} as { [id: string]: Piece });
