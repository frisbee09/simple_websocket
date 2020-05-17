import * as React from "react";
import { piecesReducer } from "../../../../redux/board/reducer";
import { BoardState } from "../../../../redux/board/state";
import { IPiece } from "../../../../redux/piece/types/IPiece";
import { PiecesActions } from "../../../../redux/types";
import { useSocket } from "../../../socket/useSocket";
import {
  GAME_STATE,
  REQUEST_GAME_STATE,
  UPDATE_PIECES,
} from "../../../../server/pieces/constants";
import {
  receiveGameState,
  sendPiecesUpdateToServer,
  receivePiecesUpdate,
} from "../../../../redux/board/actions";
import { getUserId } from "../../../socket/handleRegister";
import { PlayAreaContext, IPlayAreaContext } from "./PlayAreaContext";

interface IPlayAreaContainerProps {}

const PlayAreaContainer: React.FunctionComponent<IPlayAreaContainerProps> = (
  props
) => {
  const [gameState, gameDispatch] = React.useReducer<
    React.Reducer<BoardState, PiecesActions>
  >(piecesReducer, { byId: {}, ids: [] });
  const socket = useSocket();

  React.useEffect(() => {
    socket?.on(GAME_STATE, (game: IPiece[]) =>
      gameDispatch(receiveGameState(game))
    );
    socket?.emit(REQUEST_GAME_STATE);

    socket?.on(UPDATE_PIECES, (pieces: IPiece[]) => {
      gameDispatch(receivePiecesUpdate(pieces));
    });
  }, []);

  const syncPositionWithServer: IPlayAreaContext["syncPositionWithServer"] = (
    pieceId,
    x,
    y
  ) => {
    const pieceToUpdate = gameState.byId[pieceId];
    const newPiece: IPiece = { ...pieceToUpdate, x, y };

    console.log(newPiece);
    socket.emit(
      UPDATE_PIECES,
      sendPiecesUpdateToServer(getUserId(), [newPiece])
    );
  };

  return (
    <PlayAreaContext.Provider
      value={{ gameState, gameDispatch, syncPositionWithServer }}
    >
      {props.children}
    </PlayAreaContext.Provider>
  );
};

export default PlayAreaContainer;
