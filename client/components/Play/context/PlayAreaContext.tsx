import { BoardState } from "../../../../redux/board/state";
import { Dispatch, createContext, useContext } from "react";
import { PiecesActions } from "../../../../redux/types";

export interface IPlayAreaContext {
  syncPositionWithServer: (pieceId: string, x: number, y: number) => void;
  gameState: BoardState;
  gameDispatch: Dispatch<PiecesActions>;
}

export const PlayAreaContext = createContext<IPlayAreaContext | undefined>(
  undefined
);

export const usePlayArea = () => {
  const playAreaInfo = useContext(PlayAreaContext);
  if (playAreaInfo === undefined) {
    throw new Error(`usePlayArea must be called inside a PlayAreaProvider`);
  }

  return playAreaInfo;
};
