export class Cell {
  protected  isMoving: boolean;

  constructor(
    public positionX: number,
    public positionY: number
  ) {
  }

  public move(positionX: number, positionY: number, ) {
    const timeToMove: number = 200;

    this.isMoving = true;
    this.positionX = positionX;
    this.positionY = positionY;
    setTimeout(() => this.isMoving = false, timeToMove);
  }
}
