import { Component } from '@angular/core';
import { Injectable } from '@angular/core';

import { Tile } from './models/tile';

@Injectable()
export class BoardService {

  generateRandomlyPositionedTiles(boardDimension: number): Tile[] {
    let nonPositionedTiles: Tile[] = this.generateNonPositionedTiles(boardDimension);
    let randomizedTiles: Tile[] = this.randomizeTiles(nonPositionedTiles, boardDimension);

    return randomizedTiles;
  }

  private randomizeTiles(nonPositionedTiles: Tile[], boardDimension: number): Tile[] {
    let tiles: Tile[] = Array.from(nonPositionedTiles);
    let tileIndex: number = 0;

    for (let i = 1; i <= boardDimension; i++) {
      for (let j = 1; j <= boardDimension; j++) {
        let currentTile = tiles[tileIndex];
        if (currentTile) {
          currentTile.positionX = i;
          currentTile.positionY = j;
          tileIndex++;
        }
      }
    }

    return tiles;
  }

  private generateNonPositionedTiles(boardDimension: number): Tile[] {
    let numberOfTilesToCreate: number = boardDimension * boardDimension - 1;
    let tilesValues: number[] = this.generateShuffledTilesValues(numberOfTilesToCreate);
    let tiles: Tile[] = new Array<Tile>();

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
