import { Point } from "./Point.ts";

export class FoodFactory {
  constructor(private readonly gridSize: number) {}

  public createFood(snakeBody: Point[]): Point {
    let food: Point;
    do {
      food = new Point(
        Math.floor(Math.random() * this.gridSize),
        Math.floor(Math.random() * this.gridSize),
      );
    } while (snakeBody.some((segment) => segment.equals(food)));

    return food;
  }
}
