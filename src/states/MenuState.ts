import { GameState } from "./GameState.ts";

export class MenuState extends GameState {
  update(): Promise<void> {
    return Promise.resolve(undefined);
  }

  render() {
  }
}
