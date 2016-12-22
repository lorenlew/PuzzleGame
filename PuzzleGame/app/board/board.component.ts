import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { Tile } from './models/tile';
import { Cell } from './models/cell';
import { BoardService } from './board.service';

@Component({
  moduleId: module.id,
  selector: 'board',
  templateUrl: `board.component.html`,
  styleUrls: ['board.component.css'],
  providers: [BoardService]
})
export class BoardComponent implements OnInit {
  tiles: Tile[];
  dimension: number = 3;
  private emptyCell: Cell;

  constructor(private boardService: BoardService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.tiles = this.boardService.generateRandomlyPositionedTiles(this.dimension);
    debugger;
  }

  getHorizontalCssOffset(tile: Tile): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(tile.horizontalCssOffset);
  }

  getVerticalCssOffset(tile: Tile): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(tile.verticalCssOffset);
  }

  moveTileToAnEmptyPlace(tile: Tile) :void {
    tile.positionX = 6;
    tile.positionY = 6;
  }
}
