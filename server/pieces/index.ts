import { REQUEST_GAME_STATE, GAME_STATE, UPDATE_PIECES } from "./constants";
import { sendPiecesUpdateToServer } from "../../redux/pieces/actions";
import store, { withDispatch } from "../../redux/server/store";

/**
 * Attaches the listeners for full game state requests and piece updates
 * @param socket
 */
export const handleGameState = (socket: SocketIO.Socket) => {
  socket.on(REQUEST_GAME_STATE, () => {
    socket.emit(GAME_STATE, Object.values(store.getState().pieces.byId));
  });

  socket.on(
    UPDATE_PIECES,
    withDispatch((action: ReturnType<typeof sendPiecesUpdateToServer>) => {
      const firstPiece = action.payload.pieces[0];
      console.log(
        `${action.payload.user} moved ${firstPiece.emoji} to (${firstPiece.x}, ${firstPiece.y})`
      );
      socket.broadcast.emit(
        UPDATE_PIECES,
        Object.values(store.getState().pieces.byId)
      );
    })
  );
};
