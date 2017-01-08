import { Cell } from './cell';

export class Tile extends Cell {
  static readonly tileSideSize = 60;

  constructor(
    positionX: number,
    positionY: number,
    public value: number
  ) {
    super(positionX, positionY);
  }
}
