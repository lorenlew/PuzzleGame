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
  selector: 'game-board',
  templateUrl: 'board.component.html',
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
  dimension = 3;
  numberOfSteps = 0;
  readonly dimensions = [2, 3, 4];

  get isBoardHasSolvedState(): boolean {
    if (!this.board) {
      return true;
    }

    return this.boardService.isBoardHasSolvedState(this.board);
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
    this.board = this.boardService.generateConfiguredBoard(this.dimension);
  }

  isTileOnTheCorrectPlace(tile: Tile): boolean {
    return this.boardService.isTileOnTheCorrectPlace(tile, this.board.dimension);
  }

  getCellPositionNumber(cell: Cell): number {
    return this.boardService.getCellPositionNumber(cell, this.board.dimension);
  }

  tryMoveTileToAnEmptyCell(tile: Tile): void {
    if (this.boardService.isMovingTileAdjacentToEmptyCell(this.board, tile)) {
      let newEmptyCell = new Cell(tile.positionX, tile.positionY);
      tile.positionX = this.board.emptyCell.positionX;
      tile.positionY = this.board.emptyCell.positionY;
      this.board.emptyCell = newEmptyCell;
      this.numberOfSteps++;
    }
  }

  restartTheGame(): void {
    this.board = this.boardService.generateConfiguredBoard(this.dimension);
    this.numberOfSteps = 0;
  }
}
