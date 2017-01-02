export class Cell {

  get flexOrder(): number {
    return parseInt(`${this.positionX}${this.positionY}`);
  }

  constructor(
    public positionX: number,
    public positionY: number
  ) {
  }
}
