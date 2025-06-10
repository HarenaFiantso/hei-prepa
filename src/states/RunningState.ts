import { GameState } from "./GameState.ts";

export class RunningState extends GameState {
  private readonly GRID_SIZE = 10;
  private readonly EMPTY_SYMBOL = ".";

  update(): Promise<void> {
    return Promise.resolve(undefined);
  }

  render() {
    console.clear();
    const grid: string[][] = Array(this.GRID_SIZE)
      .fill(null)
      .map(() => Array(this.GRID_SIZE).fill(this.EMPTY_SYMBOL));

    for (let y = 0; y < this.GRID_SIZE; y++) {
      console.log(grid[y].join(" "));
    }
  }
}
