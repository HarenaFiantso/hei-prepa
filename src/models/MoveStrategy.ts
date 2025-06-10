import { Point } from "./Point.ts";
import { Direction } from "./Direction.ts";

export interface MoveStrategy {
  computeNextPosition(currentPosition: Point, direction: Direction): Point;
}

export class StandardMoveStrategy implements MoveStrategy {
  public computeNextPosition(
    currentPosition: Point,
    direction: Direction,
  ): Point {
    switch (direction) {
      case Direction.UP:
        return new Point(currentPosition.x, currentPosition.y - 1);
      case Direction.DOWN:
        return new Point(currentPosition.x, currentPosition.y + 1);
      case Direction.LEFT:
        return new Point(currentPosition.x - 1, currentPosition.y);
      case Direction.RIGHT:
        return new Point(currentPosition.x + 1, currentPosition.y);
      default:
        return currentPosition;
    }
  }
}
