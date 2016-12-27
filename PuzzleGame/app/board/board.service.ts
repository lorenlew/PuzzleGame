import { Injectable } from '@angular/core';

import { Tile } from './models/tile';
import { Board } from './models/board';

@Injectable()
export class BoardService {

  generateConfiguredBoard(boardDimension: number): Board {
    let nonPositionedTiles: Tile[] = this.generateNonPositionedTiles(boardDimension);
    let configuredBoard: Board = this.getRandomizedTiles(nonPositionedTiles, boardDimension);

    return configuredBoard;
  }

  private getRandomizedTiles(nonPositionedTiles: Tile[], boardDimension: number): Board {
    let tiles: Tile[] = Array.from(nonPositionedTiles);
    let tilesNumber: number = tiles.length;
    let tileIndex = 0;
    let tileToRemove = new Tile(0, 0, 0);

    for (let i = 1; i <= boardDimension; i++) {
      for (let j = 1; j <= boardDimension; j++) {
        let currentTile = tiles[tileIndex];
        currentTile.positionX = i;
        currentTile.positionY = j;
        tileIndex++;
        if (currentTile.value === tilesNumber) {
          tileToRemove = currentTile;
        }
      }
    }

    return new Board(tiles.filter(item => item.value !== tileToRemove.value), tileToRemove);
  }

  private generateNonPositionedTiles(boardDimension: number): Tile[] {
    let numberOfTilesToCreate: number = boardDimension * boardDimension;
    let tilesValues: number[] = this.generateShuffledTilesValues(numberOfTilesToCreate);
    let tiles = new Array<Tile>();

    tilesValues.forEach(item => {
      let newTile = new Tile(0, 0, item);
      tiles.push(newTile);
    });

    return tiles;
  }

  private generateShuffledTilesValues(tilesNumber: number): number[] {
    let tilesValues: number[] = Array.from(Array(tilesNumber).keys()).map(item => item + 1);
    let currentIndex: number = tilesValues.length;

    let temporaryValue: number;
    let randomIndex: number;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = tilesValues[currentIndex];
      tilesValues[currentIndex] = tilesValues[randomIndex];
      tilesValues[randomIndex] = temporaryValue;
    }

    return tilesValues;
  }
}
