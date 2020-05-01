import { createAction } from "typesafe-actions";
import { Piece, PiecesState } from "./state";

export const SEND_PIECES_UPDATE = "UPDATE_PIECES_ACTION";
export const sendPiecesUpdateToServer = createAction(
  SEND_PIECES_UPDATE,
  (user: string, pieces: Piece[]) => ({
    user,
    pieces,
  })
)<{ user: string; pieces: Piece[] }>();

export const UPDATE_PIECE = "UPDATE_PIECE";
export const updatePiece = createAction(UPDATE_PIECE, (piece: Piece) => ({
  piece,
}))<{ piece: Piece }>();

export const RECEIVE_GAME_STATE = "RECEIVE_GAME_STATE";
export const receiveGameState = createAction(
  RECEIVE_GAME_STATE,
  (game: Piece[]) => ({
    game,
  })
)<{ game: Piece[] }>();

export const RECEIVE_PIECES_UPDATE = "RECEIVE_PIECES_UPDATE";
export const receivePiecesUpdate = createAction(
  RECEIVE_PIECES_UPDATE,
  (pieces: Piece[]) => ({
    pieces,
  })
)<{ pieces: Piece[] }>();
