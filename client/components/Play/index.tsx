import * as React from "react";

import { usePlayArea } from "./context/PlayAreaContext";
import Piece from "../Pieces";
import { updatePiece } from "../../../redux/board/actions";

const PlayArea: React.FC<{ userId: string }> = ({ userId }) => {
  const { gameState, gameDispatch, syncPositionWithServer } = usePlayArea();

  const locallyUpdatePiece = (id: string, x: number, y: number) => {
    const thePiece = gameState.byId[id];
    gameDispatch(updatePiece({ ...thePiece, x, y }));
  };

  return (
    <div id="playArea" style={{ touchAction: "none" }}>
      {Object.values(gameState?.byId).map((piece) => (
        <Piece
          key={`Piece ${piece.id}`}
          {...piece}
          syncPiece={syncPositionWithServer}
          updatePiece={locallyUpdatePiece}
        />
      ))}
      {/* <Draggable onDragEnd=>
        <span style={{ fontSize: "5rem" }}>💩</span>
      </Draggable> */}
    </div>
  );
};

export default PlayArea;
