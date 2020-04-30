import * as React from "react";
import Draggable from "../Pieces/utils/Draggable";

const PlayArea = () => {
  return (
    <div id="playArea" style={{ touchAction: "none" }}>
      <Draggable>
        <span style={{ fontSize: "5rem" }}>💩</span>
      </Draggable>
    </div>
  );
};

export default PlayArea;
