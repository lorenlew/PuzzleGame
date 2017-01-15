import { Cell } from './cell';

export class Tile extends Cell {
  private isMoving: boolean;

  constructor(
    positionX: number,
    positionY: number,
    public value: number
  ) {
    super(positionX, positionY);
  }

  public toogleMovingState() {
    this.isMoving = !this.isMoving;
  }
}
