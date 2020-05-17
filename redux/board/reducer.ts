import { PiecesActions } from "../types";
import { BoardState } from "./state";
import { IPiece } from "../piece/types/IPiece";
import * as piecesActions from "./actions";
import { getType } from "typesafe-actions";
import withLogging from "../utils/withLogging";

const piecesReducerDefinition = (state: BoardState, action: PiecesActions) => {
  switch (action.type) {
    case getType(piecesActions.receiveGameState):
      /**
       * This should never get called on the server.
       */
      return {
        byId: transformPieceArrayToState(action.payload.game),
        ids: action.payload.game.map((piece) => piece.id),
      };

    case getType(piecesActions.updatePiece):
      const { id: pieceId, x, y } = action.payload.piece;
      return {
        ...state,
        byId: {
          ...state.byId,
          [pieceId]: Object.assign({}, state.byId[pieceId], { x, y }),
        },
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

export const piecesReducer = withLogging(piecesReducerDefinition);

const singlePieceReducer = (state: IPiece, action: PiecesActions) => {
  switch (action.type) {
    case getType(piecesActions.updatePiece):
      return { ...action.payload.piece, emoji: state.emoji };
    default:
      return state;
  }
};

const mapPiecesToReducerWithAction = (
  piecesState: BoardState,
  action: (piece: IPiece) => PiecesActions
) => (updates: IPiece[]) =>
  updates
    .filter((piece) => piecesState.ids.includes(piece.id))
    .map((piece) =>
      singlePieceReducer(piecesState.byId[piece.id], action(piece))
    );

const transformPieceArrayToState = (updates: IPiece[]) =>
  updates.reduce((newState, piece) => {
    newState[piece.id] = piece;
    return newState;
  }, {} as { [id: string]: IPiece });
