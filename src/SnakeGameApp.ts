import figlet from "npm:figlet";
import { GameState } from "./states/GameState.ts";
import { MenuState } from "./states/MenuState.ts";
import { Point } from "./models/Point.ts";
import { FoodFactory } from "./models/FoodFactory.ts";
import { Snake } from "./models/Snake.ts";
import { SnakeBuilder } from "./models/SnakeBuilder.ts";
import { Direction } from "./models/Direction.ts";
import { StandardMoveStrategy } from "./models/MoveStrategy.ts";

export class SnakeGameApp {
  private snake!: Snake;
  private food!: Point;
  private foodFactory: FoodFactory;
  private state: GameState;
  private score: number = 0;
  private readonly GRID_SIZE = 10;

  constructor() {
    this.foodFactory = new FoodFactory(this.GRID_SIZE);
    this.initializeGame();
    this.state = new MenuState(this);
  }

  public async setState(newState: GameState) {
    this.state = newState;
    await this.runGameLoop();
  }

  public getSnake(): Snake {
    return this.snake;
  }

  public getFood(): Point {
    return this.food;
  }

  public getScore(): number {
    return this.score;
  }

  public isGameOver(): boolean {
    return this.snake.checkCollision(this.GRID_SIZE);
  }

  public tick(): void {
    this.snake.move();

    if (this.snake.getHead().equals(this.food)) {
      this.snake.grow();
      this.food = this.foodFactory.createFood(this.snake.getBody());
      this.score++;
    }
  }

  public reset(): void {
    this.initializeGame();
    this.score = 0;
  }

  private initializeGame(): void {
    const initialPosition = new Point(
      Math.floor(this.GRID_SIZE / 2),
      Math.floor(this.GRID_SIZE / 2),
    );

    this.snake = new SnakeBuilder()
      .withInitialPosition(initialPosition.x, initialPosition.y)
      .withLength(3)
      .withDirection(Direction.RIGHT)
      .withMoveStrategy(new StandardMoveStrategy())
      .build();

    this.food = this.foodFactory.createFood(this.snake.getBody());
  }

  public run(): void {
    figlet("Snake Game!", (err: unknown, data: string | undefined) => {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
      this.runGameLoop().catch((error) =>
        console.log(`The game is not looping: ${error}`)
      );
    });
  }

  private async runGameLoop(): Promise<void> {
    try {
      while (true) {
        this.state.render();
        await this.state.update();
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error("Error in game loop:", error);
      Deno.exit(1);
    }
  }
}
