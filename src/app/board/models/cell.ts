export class Cell {

  constructor(
    public positionX: number,
    public positionY: number
  ) {
  }

  public move(positionX: number, positionY: number, ) {
    this.positionX = positionX;
    this.positionY = positionY;
  }
}
