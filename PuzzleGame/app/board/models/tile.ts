import { Cell } from './cell';

export class Tile extends Cell {
  static readonly tileSideSize = 50;

  constructor(
    public positionX: number,
    public positionY: number,
    public value: number
  ) {
    super(positionX, positionY);
  }
}
