export interface IPiece {
  id: string;
  x: number;
  y: number;
  contains: IPiece[];
  emoji: string;
}
