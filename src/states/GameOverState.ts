import { GameState } from "./GameState.ts";

export class GameOverState extends GameState {
  update(): Promise<void> {
    return Promise.resolve(undefined);
  }

  render() {
  }
}
