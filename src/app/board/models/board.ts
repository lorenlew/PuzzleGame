import { Tile } from './tile';
import { Cell } from './cell';

export class Board {

  constructor(
    public dimension: number,
    public randomlyPositionedTiles: Tile[],
    public emptyCell: Cell
  ) {
  }
}
