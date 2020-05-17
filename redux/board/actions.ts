import { createAction } from "typesafe-actions";
import { BoardState } from "./state";
import { IPiece } from "../piece/types/IPiece";

export const SEND_PIECES_UPDATE = "UPDATE_PIECES_ACTION";
export const sendPiecesUpdateToServer = createAction(
  SEND_PIECES_UPDATE,
  (user: string, pieces: IPiece[]) => ({
    user,
    pieces,
  })
)<{ user: string; pieces: IPiece[] }>();

export const UPDATE_PIECE = "UPDATE_PIECE";
export const updatePiece = createAction(UPDATE_PIECE, (piece: IPiece) => ({
  piece,
}))<{ piece: IPiece }>();

export const RECEIVE_GAME_STATE = "RECEIVE_GAME_STATE";
export const receiveGameState = createAction(
  RECEIVE_GAME_STATE,
  (game: IPiece[]) => ({
    game,
  })
)<{ game: IPiece[] }>();

export const RECEIVE_PIECES_UPDATE = "RECEIVE_PIECES_UPDATE";
export const receivePiecesUpdate = createAction(
  RECEIVE_PIECES_UPDATE,
  (pieces: IPiece[]) => ({
    pieces,
  })
)<{ pieces: IPiece[] }>();
