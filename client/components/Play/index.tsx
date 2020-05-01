import * as React from "react";
import Draggable from "../Pieces/utils/Draggable";
import { useSocket } from "../../socket/useSocket";
import {
  REQUEST_GAME_STATE,
  GAME_STATE,
  UPDATE_PIECES,
} from "../../../server/pieces/constants";
import {
  initialPiecesState,
  PiecesState,
  Piece,
} from "../../../redux/pieces/state";
import { piecesReducer } from "../../../redux/pieces/reducer";
import { PiecesActions } from "../../../redux/types";
import {
  UPDATE_PIECE,
  receiveGameState,
  sendPiecesUpdateToServer,
  receivePiecesUpdate,
  updatePiece,
} from "../../../redux/pieces/actions";

const PlayArea: React.FC<{ userId: string }> = ({ userId }) => {
  const socket = useSocket();
  const [gameState, playDispatch] = React.useReducer<
    React.Reducer<PiecesState, PiecesActions>
  >(piecesReducer, { byId: {}, ids: [] });

  React.useEffect(() => {
    socket?.on(GAME_STATE, (game: Piece[]) =>
      playDispatch(receiveGameState(game))
    );
    socket?.emit(REQUEST_GAME_STATE);
    // socket?.on(UPDATE_PIECES, (pieces: Piece[]) => {
    //   playDispatch(receivePiecesUpdate(pieces));
    // });
  }, []);

  const syncPositionWithServer = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    const pieceId = ((e.target as HTMLSpanElement)
      .parentElement as HTMLDivElement).id;

    const pieceToUpdate = gameState.byId[pieceId];
    let newX: number;
    let newY: number;

    if ((e as React.MouseEvent).clientX) {
      const newE = e as React.MouseEvent;
      newX = newE.clientX;
      newY = newE.clientY;
    } else {
      const changed = (e as React.TouchEvent).changedTouches[0];
      newX = changed.clientX;
      newY = changed.clientY;
    }

    const newPiece: Piece = { ...pieceToUpdate, x: newX, y: newY };

    console.log(newPiece);
    socket.emit(UPDATE_PIECES, sendPiecesUpdateToServer(userId, [newPiece]));
  };

  return (
    <div id="playArea" style={{ touchAction: "none" }}>
      {JSON.stringify(gameState)}
      {Object.values(gameState?.byId).map((piece) => (
        <Draggable
          key={piece.id}
          id={piece.id}
          initialX={piece.x}
          initialY={piece.y}
          onDragEnd={syncPositionWithServer}
        >
          <span style={{ fontSize: "5rem" }}>{piece.emoji}</span>
        </Draggable>
      ))}
      {/* <Draggable onDragEnd=>
        <span style={{ fontSize: "5rem" }}>💩</span>
      </Draggable> */}
    </div>
  );
};

export default PlayArea;
