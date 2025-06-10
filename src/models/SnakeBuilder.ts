import { Point } from "./Point.ts";
import { Direction } from "./Direction.ts";
import { MoveStrategy } from "./MoveStrategy.ts";
import { Snake } from "./Snake.ts";

export class SnakeBuilder {
  private body: Point[] = [];
  private direction: Direction = Direction.RIGHT;
  private moveStrategy!: MoveStrategy;

  public withInitialPosition(x: number, y: number): SnakeBuilder {
    this.body = [new Point(x, y)];
    return this;
  }

  public withLength(length: number): SnakeBuilder {
    if (this.body.length === 0) {
      throw new Error("Set initial position first");
    }

    const head = this.body[0];
    for (let i = 1; i < length; i++) {
      this.body.push(new Point(head.x - i, head.y));
    }
    return this;
  }

  public withDirection(direction: Direction): SnakeBuilder {
    this.direction = direction;
    return this;
  }

  public withMoveStrategy(moveStrategy: MoveStrategy): SnakeBuilder {
    this.moveStrategy = moveStrategy;
    return this;
  }

  public build(): Snake {
    if (!this.moveStrategy) {
      throw new Error("MoveStrategy is required");
    }
    return new Snake(this.body, this.direction, this.moveStrategy);
  }
}
