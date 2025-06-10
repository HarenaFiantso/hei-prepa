import { GameState } from "./GameState.ts";

export class RunningState extends GameState {
  update(): Promise<void> {
    return Promise.resolve(undefined);
  }

  render() {
  }
}
