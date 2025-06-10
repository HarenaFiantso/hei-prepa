import { SnakeGameApp } from "../SnakeGameApp.ts";

export abstract class GameState {
  constructor(private game: SnakeGameApp) {
  }

  public abstract update(): Promise<void>;
  public abstract render(): void;
}
