import { Cell } from './cell';

export class Tile extends Cell {
  protected isMoving: boolean;

  constructor(
    positionX: number,
    positionY: number,
    public value: number
  ) {
    super(positionX, positionY);
  }

  move(positionX: number, positionY: number): void {
    const timeToMove: number = 200;

    this.isMoving = true;
    super.move(positionX, positionY);
    setTimeout(() => this.isMoving = false, timeToMove);
  }
}
