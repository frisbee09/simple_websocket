import * as React from "react";
import Draggable, {
  DraggableProps,
  DraggableEventHandler,
} from "./utils/Draggable";
import { IPlayAreaContext } from "../Play/context/PlayAreaContext";

interface PieceProps extends Omit<DraggableProps, "onMove"> {
  id: string;
  emoji: string;
  updatePiece: (id: string, x: number, y: number) => any;
  syncPiece: IPlayAreaContext["syncPositionWithServer"];
}

const Piece = ({ id, x, y, emoji, updatePiece, syncPiece }: PieceProps) => {
  const handleMoveEnd: DraggableEventHandler = ({ x: newX, y: newY }) => {
    syncPiece(id, newX, newY);
  };

  const handleLocalUpdate: DraggableEventHandler = ({ x: newX, y: newY }) => {
    updatePiece(id, newX, newY);
  };

  return (
    <Draggable
      
      id={id}
      x={x}
      y={y}
      onMove={handleLocalUpdate}
      onMoveEnd={handleMoveEnd}
    >
      <span style={{ fontSize: "5rem" }}>{emoji}</span>
    </Draggable>
  );
};

export default React.memo(Piece);
