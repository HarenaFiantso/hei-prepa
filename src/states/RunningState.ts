import { GameState } from "./GameState.ts";

export class RunningState extends GameState {
  private readonly GRID_SIZE = 10;
  private readonly EMPTY_SYMBOL = ".";
  private readonly FOOD_SYMBOL = "@";
  private readonly SNAKE_SYMBOL = "#";

  update(): Promise<void> {
    return Promise.resolve(undefined);
  }

  render() {
    console.clear();
    const grid: string[][] = Array(this.GRID_SIZE)
        .fill(null)
        .map(() => Array(this.GRID_SIZE).fill(this.EMPTY_SYMBOL));

    grid[this.game.getFood().y][this.game.getFood().x] = this.FOOD_SYMBOL;

    for (let y = 0; y < this.GRID_SIZE; y++) {
      console.log(grid[y].join(" "));
    }
  }
}
