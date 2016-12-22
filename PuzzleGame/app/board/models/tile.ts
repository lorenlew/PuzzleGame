import { Cell } from './cell';

export class Tile extends Cell {
  static positionOffsetValue: number = 65;

  constructor(
    positionX: number,
    positionY: number,
    public value: number
  ) {
    super(positionX, positionY);
  }

  get horizontalCssOffset(): string {
    return this.positionX * Tile.positionOffsetValue + "px";
  }

  get verticalCssOffset(): string {
    return this.positionY * Tile.positionOffsetValue + "px";
  }
}
