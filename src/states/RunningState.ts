import { GameState } from "./GameState.ts";
import { Direction } from "../models/Direction.ts";
import { GameOverState } from "./GameOverState.ts";

export class RunningState extends GameState {
  private readonly GRID_SIZE = 10;
  private readonly EMPTY_SYMBOL = ".";
  private readonly FOOD_SYMBOL = "@";
  private readonly SNAKE_SYMBOL = "#";

  public async update(): Promise<void> {
    const direction = await this.getDirectionInput();

    if (direction) {
      this.game.getSnake().setDirection(direction);
    }

    this.game.tick();

    if (this.game.isGameOver()) {
      await this.game.setState(new GameOverState(this.game));
    }
  }

  public render(): void {
    console.clear();
    const grid: string[][] = Array(this.GRID_SIZE)
      .fill(null)
      .map(() => Array(this.GRID_SIZE).fill(this.EMPTY_SYMBOL));

    grid[this.game.getFood().y][this.game.getFood().x] = this.FOOD_SYMBOL;

    this.game.getSnake().getBody().forEach((segment) => {
      grid[segment.y][segment.x] = this.SNAKE_SYMBOL;
    });

    for (let y = 0; y < this.GRID_SIZE; y++) {
      console.log(grid[y].join(" "));
    }

    console.log(`Score: ${this.game.getScore()}`);
    console.log("Controls: Z (Up), S (Down), Q (Left), D (Right)");
  }

  private async getDirectionInput(): Promise<Direction | null> {
    const buf = new Uint8Array(1024);

    await Deno.stdout.write(new TextEncoder().encode("Direction (Z/S/Q/D): "));

    const n = await Deno.stdin.read(buf);
    if (n === null) return null;

    const input = new TextDecoder().decode(buf.subarray(0, n)).trim()
      .toLowerCase();

    switch (input) {
      case "z":
        return Direction.UP;
      case "s":
        return Direction.DOWN;
      case "q":
        return Direction.LEFT;
      case "d":
        return Direction.RIGHT;
      default:
        return null;
    }
  }
}
