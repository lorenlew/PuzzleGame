import {
  Component,
  OnInit,
  trigger,
  style,
  transition,
  animate
  } from '@angular/core';

import { BoardService } from './board.service';
import { Tile } from './models/tile';
import { Cell } from './models/cell';
import { Board } from './models/board';


@Component({
  moduleId: module.id,
  selector: 'game-board',
  templateUrl: `board.component.html`,
  styleUrls: ['board.component.css'],
  animations: [
    trigger('tileAnimation',
    [
      transition(':enter',
      [
        style({ transform: 'scale(1.4)' }),
        animate(300)
      ])
    ])
  ],
  providers: [BoardService]
})
export class BoardComponent implements OnInit {
  board: Board;
  dimension = 4;
  numberOfSteps = 0;
  readonly dimensions = [2, 3, 4, 5];

  get isBoardHasOrderedState(): boolean {
    if (!this.board) {
      return true;
    }
    let sortedTalesByValue: Tile[] = this.board.randomlyPositionedTiles.sort((n1, n2) => n1.value - n2.value);

    let isBoardHasOrderedState: boolean = sortedTalesByValue.every((element: Tile, index: number, array: Tile[]) => {
      let rightTile: Tile = array[index + 1];
      let isTileInTheCorrectOrder: boolean = rightTile
        ? element.flexOrder < rightTile.flexOrder
        : true;

      return isTileInTheCorrectOrder;
    });
    return isBoardHasOrderedState;
  }

  get tileflexBasis(): number {
    const fullPercentSize = 100;
    return fullPercentSize / this.dimension;
  }

  get boardSideSize(): number {
    return this.dimension * Tile.tileSideSize;
  }

  constructor(private boardService: BoardService) {
  }

  ngOnInit(): void {
    while (this.isBoardHasOrderedState) {
      this.board = this.boardService.generateConfiguredBoard(this.dimension);
    }
  }

  tryMoveTileToAnEmptyCell(tile: Tile): void {
    if (this.isAdjacentToEmptyCell(tile)) {
      let newEmptyCell = new Cell(tile.positionX, tile.positionY);
      tile.positionX = this.board.emptyCell.positionX;
      tile.positionY = this.board.emptyCell.positionY;
      this.board.emptyCell = newEmptyCell;
      this.numberOfSteps++;
    }
  }

  restartTheGame(): void {
    let stateChanged = false;

    while (this.isBoardHasOrderedState || !stateChanged) {
      this.board = this.boardService.generateConfiguredBoard(this.dimension);
      stateChanged = true;
    }
    this.numberOfSteps = 0;
  }

  private isAdjacentToEmptyCell(tile: Tile): boolean {
    let isDistanceAlongSameAxisMinimal = (firstCellAxisPosition: number, secondCellAxisPosition: number): boolean => {
      const minimalDistanceAlongAxis = 1;

      return (Math.abs(firstCellAxisPosition - secondCellAxisPosition) === minimalDistanceAlongAxis);
    }
    return tile.positionX === this.board.emptyCell.positionX && isDistanceAlongSameAxisMinimal(tile.positionY, this.board.emptyCell.positionY) ||
           tile.positionY === this.board.emptyCell.positionY && isDistanceAlongSameAxisMinimal(tile.positionX, this.board.emptyCell.positionX);
  }
}
