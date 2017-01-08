import { Injectable } from '@angular/core';

import { Tile } from './models/tile';
import { Cell } from './models/cell';
import { Board } from './models/board';

@Injectable()
export class BoardService {

  generateConfiguredBoard(boardDimension: number): Board {
    let nonPositionedTiles: Tile[] = this.generateNonPositionedTilesWithShuffledValues(boardDimension);
    let configuredBoard: Board = this.getBoardWithRandomizedTiles(nonPositionedTiles, boardDimension);

    if (!this.isPossibleToSolveBoard(configuredBoard) || this.isBoardHasSolvedState(configuredBoard)) {
      return this.generateConfiguredBoard(boardDimension);
    }

    return configuredBoard;
  }

  isBoardHasSolvedState(board: Board): boolean {
    let isBoardHasSolvedState: boolean = board.randomlyPositionedTiles.every((tile: Tile) => {
      return this.isTileOnTheCorrectPlace(tile, board.dimension);
    });

    return isBoardHasSolvedState;
  }

  isTileOnTheCorrectPlace(tile: Tile, boardDimension: number): boolean {
    return this.getCellPositionNumber(tile, boardDimension) === tile.value;
  }

  getCellPositionNumber(tile: Cell, boardDimension: number): number {
    return (tile.positionX - 1) * boardDimension + tile.positionY;
  }

  isMovingTileAdjacentToEmptyCell(board: Board, tile: Tile): boolean {
    let isDistanceAlongSameAxisMinimal = (firstCellAxisPosition: number, secondCellAxisPosition: number): boolean => {
      const minimalDistanceAlongAxis = 1;

      return (Math.abs(firstCellAxisPosition - secondCellAxisPosition) === minimalDistanceAlongAxis);
    }
    return tile.positionX === board.emptyCell.positionX && isDistanceAlongSameAxisMinimal(tile.positionY, board.emptyCell.positionY) ||
      tile.positionY === board.emptyCell.positionY && isDistanceAlongSameAxisMinimal(tile.positionX, board.emptyCell.positionX);
  }

  private isPossibleToSolveBoard(board: Board): boolean {
    let numberOfTilesToTheRightWhichAreLessThanEachSingleTile: number = 0;

    board.randomlyPositionedTiles.forEach((currentTile: Tile, index: number, tiles: Tile[]) => {
      let currentTilePositionNumber: number = this.getCellPositionNumber(currentTile, board.dimension);

      let numberOfTilesToTheRightWhichAreLessThanCurrentTile: number = tiles.filter((tileToCompare: Tile) => {
        let tileToComparePositionNumber: number = this.getCellPositionNumber(tileToCompare, board.dimension);

        return tileToComparePositionNumber > currentTilePositionNumber && tileToCompare.value < currentTile.value;
      }).length;
      numberOfTilesToTheRightWhichAreLessThanEachSingleTile += numberOfTilesToTheRightWhichAreLessThanCurrentTile;
    });

    let isPossibleToSolveBoard: boolean = (numberOfTilesToTheRightWhichAreLessThanEachSingleTile + board.emptyCell.positionX) % 2 === 0;

    return isPossibleToSolveBoard;
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
