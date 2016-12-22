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
  dimension: number = 3;

  constructor(private boardService: BoardService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.board = this.boardService.generateConfiguredBoard(this.dimension);
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
    this.board = this.boardService.generateConfiguredBoard(this.dimension);
  }

  private isAdjacentCell(tile: Tile): boolean {
    return tile.positionX === this.board.emptyCell.positionX &&
      (Math.abs(tile.positionY - this.board.emptyCell.positionY) === 1) ||
      tile.positionY === this.board.emptyCell.positionY &&
      (Math.abs(tile.positionX - this.board.emptyCell.positionX) === 1);
  }
}
