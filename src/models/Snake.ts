import { Point } from "./Point.ts";
import { Direction } from "./Direction.ts";
import { MoveStrategy } from "./MoveStrategy.ts";

export class Snake {
  private readonly body: Point[];
  private direction: Direction;
  private moveStrategy: MoveStrategy;

  constructor(
    initialBody: Point[],
    initialDirection: Direction,
    moveStrategy: MoveStrategy,
  ) {
    this.body = [...initialBody];
    this.direction = initialDirection;
    this.moveStrategy = moveStrategy;
  }

  public getHead(): Point {
    return this.body[0];
  }

  public getBody(): Point[] {
    return [...this.body];
  }

  public getDirection(): Direction {
    return this.direction;
  }

  public setDirection(newDirection: Direction): void {
    this.direction = newDirection;
  }

  public move(): void {
    const newHead = this.moveStrategy.computeNextPosition(
      this.getHead(),
      this.direction,
    );
    this.body.unshift(newHead);
    this.body.pop();
  }

  public grow(): void {
    const tail = this.body[this.body.length - 1];
    this.body.push(new Point(tail.x, tail.y));
  }

  public checkCollision(gridSize: number): boolean {
    const head = this.getHead();

    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      return true;
    }

    return this.body.slice(1).some((segment) => segment.equals(head));
  }
}
