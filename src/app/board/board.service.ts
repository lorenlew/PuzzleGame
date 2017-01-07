import { Injectable } from '@angular/core';

import { Tile } from './models/tile';
import { Board } from './models/board';

@Injectable()
export class BoardService {

  generateConfiguredBoard(boardDimension: number): Board {
    let nonPositionedTiles: Tile[] = this.generateNonPositionedTilesWithShuffledValues(boardDimension);
    let configuredBoard: Board = this.getBoardWithRandomizedTiles(nonPositionedTiles, boardDimension);

    return configuredBoard;
  }

  isBoardHasSolvedState(board: Board): boolean {
    let emptyCellHasLastPosition = board.emptyCell.positionX === board.emptyCell.positionY && board.emptyCell.positionY === board.dimension;
    if (!emptyCellHasLastPosition) {
      return false;
    }

    let sortedTalesByValue: Tile[] = board.randomlyPositionedTiles.sort((n1, n2) => n1.value - n2.value);

    let isBoardHasSolvedState: boolean = sortedTalesByValue.every((element: Tile, index: number, array: Tile[]) => {
      let rightTile: Tile = array[index + 1];
      let isTileInTheCorrectOrder: boolean = rightTile
        ? element.flexOrder < rightTile.flexOrder
        : true;

      return isTileInTheCorrectOrder;
    });

    return isBoardHasSolvedState;
  }

  private getBoardWithRandomizedTiles(nonPositionedTiles: Tile[], boardDimension: number): Board {
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

    return new Board(boardDimension, tiles.filter(item => item.value !== tileToRemove.value), tileToRemove);
  }

  private generateNonPositionedTilesWithShuffledValues(boardDimension: number): Tile[] {
    let numberOfTilesToCreate: number = boardDimension * boardDimension;
    let tilesValues: number[] = this.generateShuffledTilesValues(numberOfTilesToCreate);
    let tiles: Tile[] = tilesValues.map(item => {
      return new Tile(0, 0, item);
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
