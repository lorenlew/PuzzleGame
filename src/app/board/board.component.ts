import {
  Component,
  OnInit,
  trigger,
  style,
  transition,
  animate
} from '@angular/core';

import { BoardService } from './board.service';
import { GifService } from './gif.service';
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
  providers: [BoardService, GifService]
})
export class BoardComponent implements OnInit {
  board: Board;
  dimension = 3;
  readonly dimensions = [3, 4, 5];

  numberOfSteps = 0;
  encouragementImageUrl: string;
  encouragementShown: boolean;

  get isBoardHasSolvedState(): boolean {
    if (!this.board) {
      return true;
    }

    let isBoardHasSolvedState: boolean = this.boardService.isBoardHasSolvedState(this.board);
    if (isBoardHasSolvedState && !this.encouragementShown) {
      this.showEncouragement();
      this.encouragementShown = true;
    }
    return isBoardHasSolvedState;
  }

  get tileflexBasis(): number {
    const fullPercentSize = 100;
    return fullPercentSize / this.dimension;
  }

  constructor(private boardService: BoardService, private gifService: GifService) {
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
    this.encouragementShown = false;
    this.encouragementImageUrl = null;
  }

  showEncouragement(): void {
    this.gifService.generateRandomGif()
      .subscribe(
      imageUrl => {
        this.encouragementImageUrl = imageUrl;
      });
  }
}
