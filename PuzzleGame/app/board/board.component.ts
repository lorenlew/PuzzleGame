import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { BoardService } from './board.service';
import { Tile } from './models/tile';
import { Cell } from './models/cell';
import { Board } from './models/board';


@Component({
  moduleId: module.id,
  selector: 'board',
  templateUrl: `board.component.html`,
  styleUrls: ['board.component.css'],
  providers: [BoardService]
})
export class BoardComponent implements OnInit {
  board: Board;
  dimension: number = 2;

  constructor(private boardService: BoardService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    while (this.isBoardHasOrderedState) {
      this.board = this.boardService.generateConfiguredBoard(this.dimension);
    }
  }

  getHorizontalCssOffset(tile: Tile): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(tile.horizontalCssOffset);
  }

  getVerticalCssOffset(tile: Tile): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(tile.verticalCssOffset);
  }

  tryMoveTileToAnEmptyCell(tile: Tile): void {
    if (this.isAdjacentCell(tile)) {
      let newEmptyCell: Cell = new Cell(tile.positionX, tile.positionY);
      tile.positionX = this.board.emptyCell.positionX;
      tile.positionY = this.board.emptyCell.positionY;
      this.board.emptyCell = newEmptyCell;
    }
  }

  restartTheGame(): void {
    let stateChanged: boolean = false;

    while (this.isBoardHasOrderedState || !stateChanged) {
      this.board = this.boardService.generateConfiguredBoard(this.dimension);
      stateChanged = true;
    }
  }

  private isAdjacentCell(tile: Tile): boolean {
    return tile.positionX === this.board.emptyCell.positionX &&
      (Math.abs(tile.positionY - this.board.emptyCell.positionY) === 1) ||
      tile.positionY === this.board.emptyCell.positionY &&
      (Math.abs(tile.positionX - this.board.emptyCell.positionX) === 1);
  }


  get isBoardHasOrderedState(): boolean {
    if (!this.board) {
      return true;
    }
    let sortedTalesByValue: Tile[] = this.board.randomlyPositionedTiles.sort((n1, n2) => n1.value - n2.value);

    let isBoardHasOrderedState: boolean = sortedTalesByValue.every((element: Tile, index: number, array: Tile[]) => {
      let rightTile: Tile = array[index + 1];
      let isTileInTheCorrectOrder: boolean = rightTile ?
        parseInt(element.positionX + "" + element.positionY) <
        parseInt(rightTile.positionX + "" + rightTile.positionY)
        : true;

      return isTileInTheCorrectOrder;
    });
    return isBoardHasOrderedState;
  }
}
