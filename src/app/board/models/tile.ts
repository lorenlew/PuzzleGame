import { Cell } from './cell';

export class Tile extends Cell {

  constructor(
    positionX: number,
    positionY: number,
    public value: number
  ) {
    super(positionX, positionY);
  }
}
