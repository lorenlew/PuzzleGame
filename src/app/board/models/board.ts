import { Tile } from './tile';
import { Cell } from './cell';

export class Board {

  get manhattanDistance(): number {
    let distanceSum: number = 0;
    this.randomlyPositionedTiles.forEach((tile) => {
      let targetPositionX: number;
      let targetPositionY: number;

      let isTileMultipleDimension = tile.value % this.dimension === 0;
      if (isTileMultipleDimension) {
        targetPositionX = tile.value / this.dimension;
        targetPositionY = this.dimension;
      } else {
        targetPositionY = tile.value % this.dimension;
        targetPositionX = ((tile.value - targetPositionY) / this.dimension) + 1;
      }
      let manhattanDistanceForTile = Math.abs(tile.positionX - targetPositionX) + Math.abs(tile.positionY - targetPositionY);
      distanceSum += manhattanDistanceForTile;
    });

    return distanceSum;
  }
  constructor(
    public dimension: number,
    public randomlyPositionedTiles: Tile[],
    public emptyCell: Cell
  ) {
  }
}
