import { Component, OnInit } from '@angular/core';

import { BoardService } from './board.service';
import { Tile } from './models/tile';
import { Cell } from './models/cell';
import { Board } from './models/board';


@Component({
  moduleId: module.id,
  selector: 'game-board',
  templateUrl: `board.component.html`,
  styleUrls: ['board.component.css'],
  providers: [BoardService]
})
export class BoardComponent implements OnInit {
  board: Board;
  dimension = 4;
  numberOfSteps = 0;
  readonly dimensions = [2, 3, 4, 5];
  readonly fullPercentSize = 100;

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
    return this.fullPercentSize / this.dimension;
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
    return tile.positionX === this.board.emptyCell.positionX && (Math.abs(tile.positionY - this.board.emptyCell.positionY) === 1) ||
           tile.positionY === this.board.emptyCell.positionY && (Math.abs(tile.positionX - this.board.emptyCell.positionX) === 1);
  }
}
